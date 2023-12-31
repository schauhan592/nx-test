// @ts-ignore
import getSideChannel from 'side-channel';
import utils from './qsUtils';
import formats from './format';

const has = Object.prototype.hasOwnProperty;

const arrayPrefixGenerators: any = {
  brackets: function brackets(prefix: string) {
    return prefix + '[]';
  },
  comma: 'comma',
  indices: function indices(prefix: string, key: string) {
    return prefix + '[' + key + ']';
  },
  repeat: function repeat(prefix: any) {
    return prefix;
  },
};

const isArray = Array.isArray;
const split = String.prototype.split;
const push = Array.prototype.push;
const pushToArray = function (arr: any[], valueOrArray: any[]) {
  push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
};

const toISO = Date.prototype.toISOString;

const defaultFormat = formats['default'];
const defaults: any = {
  addQueryPrefix: false,
  allowDots: false,
  charset: 'utf-8',
  charsetSentinel: false,
  delimiter: '&',
  encode: true,
  encoder: utils.encode,
  encodeValuesOnly: false,
  format: defaultFormat,
  formatter: formats.formatters[defaultFormat],
  // deprecated
  indices: false,
  serializeDate: function serializeDate(date: any) {
    return toISO.call(date);
  },
  skipNulls: false,
  strictNullHandling: false,
};

const isNonNullishPrimitive = function isNonNullishPrimitive(v: any) {
  return (
    typeof v === 'string' ||
    typeof v === 'number' ||
    typeof v === 'boolean' ||
    typeof v === 'symbol' ||
    typeof v === 'bigint'
  );
};

const sentinel = {};

const stringify = function stringify(
  object: any,
  prefix: string,
  generateArrayPrefix: string | ((arg0: any, arg1: any) => any),
  commaRoundTrip: any,
  strictNullHandling: any,
  skipNulls: any,
  encoder: (arg0: string, arg1: any, arg2: any, arg3: string, arg4: any) => any,
  filter: (arg0: any, arg1: any) => Array<any>,
  sort: ((a: string, b: string) => number) | undefined,
  allowDots: boolean,
  serializeDate: (arg0: Date) => any,
  format: any,
  formatter: (arg0: string) => string,
  encodeValuesOnly: any,
  charset: any,
  sideChannel: { set: (arg0: any, arg1: number) => void }
) {
  let obj = object;

  let tmpSc: any = sideChannel;
  let step = 0;
  let findFlag = false;
  while ((tmpSc = tmpSc.get(sentinel)) !== void undefined && !findFlag) {
    // Where object last appeared in the ref tree
    const pos = tmpSc.get(object);
    step += 1;
    if (typeof pos !== 'undefined') {
      if (pos === step) {
        throw new RangeError('Cyclic object value');
      } else {
        findFlag = true; // Break while
      }
    }
    if (typeof tmpSc.get(sentinel) === 'undefined') {
      step = 0;
    }
  }

  if (typeof filter === 'function') {
    obj = filter(prefix, obj);
  } else if (obj instanceof Date) {
    obj = serializeDate(obj);
  } else if (generateArrayPrefix === 'comma' && isArray(obj)) {
    obj = utils.maybeMap(obj, function (value: any) {
      if (value instanceof Date) {
        return serializeDate(value);
      }
      return value;
    });
  }

  if (obj === null) {
    if (strictNullHandling) {
      return (encoder as any) && !encodeValuesOnly
        ? encoder(prefix, defaults.encoder, charset, 'key', format)
        : prefix;
    }

    obj = '';
  }

  if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
    if (encoder) {
      const keyValue = encodeValuesOnly
        ? prefix
        : encoder(prefix, defaults.encoder, charset, 'key', format);
      if (generateArrayPrefix === 'comma' && encodeValuesOnly) {
        const valuesArray = split.call(String(obj), ',' as any);
        let valuesJoined = '';
        for (let i = 0; i < valuesArray.length; ++i) {
          valuesJoined +=
            (i === 0 ? '' : ',') +
            formatter(encoder(valuesArray[i], defaults.encoder, charset, 'value', format));
        }
        return [
          formatter(keyValue) +
            (commaRoundTrip && isArray(obj) && valuesArray.length === 1 ? '[]' : '') +
            '=' +
            valuesJoined,
        ];
      }
      return [
        formatter(keyValue) +
          '=' +
          formatter(encoder(obj, defaults.encoder, charset, 'value', format)),
      ];
    }
    return [formatter(prefix) + '=' + formatter(String(obj))];
  }

  const values: never[] = [];

  if (typeof obj === 'undefined') {
    return values;
  }

  let objKeys: string | any[];
  if (generateArrayPrefix === 'comma' && isArray(obj)) {
    // we need to join elements in
    objKeys = [{ value: obj.length > 0 ? obj.join(',') || null : void undefined }];
  } else {
    const keys = Object.keys(obj);
    objKeys = sort ? keys.sort(sort) : keys;
  }

  const adjustedPrefix =
    commaRoundTrip && isArray(obj) && obj.length === 1 ? prefix + '[]' : prefix;

  for (let j = 0; j < objKeys.length; ++j) {
    const key = objKeys[j];
    const value =
      typeof key === 'object' && typeof key.value !== 'undefined' ? key.value : obj[key];

    if (skipNulls && value === null) {
      continue;
    }

    const keyPrefix = isArray(obj)
      ? typeof generateArrayPrefix === 'function'
        ? generateArrayPrefix(adjustedPrefix, key)
        : adjustedPrefix
      : adjustedPrefix + (allowDots ? '.' + key : '[' + key + ']');

    sideChannel.set(object, step);
    const valueSideChannel = getSideChannel();
    valueSideChannel.set(sentinel, sideChannel);
    pushToArray(
      values,
      stringify(
        value,
        keyPrefix,
        generateArrayPrefix,
        commaRoundTrip,
        strictNullHandling,
        skipNulls,
        encoder,
        filter,
        sort,
        allowDots,
        serializeDate,
        format,
        formatter,
        encodeValuesOnly,
        charset,
        valueSideChannel
      )
    );
  }

  return values;
};

const normalizeStringifyOptions = function normalizeStringifyOptions(opts: {
  encoder: any;
  charset?: string;
  format?: PropertyKey;
  filter?: any;
  addQueryPrefix?: any;
  allowDots?: any;
  charsetSentinel?: any;
  delimiter?: any;
  encode: any;
  encodeValuesOnly: any;
  serializeDate: any;
  skipNulls: any;
  sort: any;
  strictNullHandling: any;
}) {
  if (!opts) {
    return defaults;
  }

  if (
    opts.encoder !== null &&
    typeof opts.encoder !== 'undefined' &&
    typeof opts.encoder !== 'function'
  ) {
    throw new TypeError('Encoder has to be a function.');
  }

  const charset = opts.charset || defaults.charset;
  if (
    typeof opts.charset !== 'undefined' &&
    opts.charset !== 'utf-8' &&
    opts.charset !== 'iso-8859-1'
  ) {
    throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
  }

  let format: any = formats['default'];
  if (typeof opts.format !== 'undefined') {
    if (!has.call(formats.formatters, opts.format)) {
      throw new TypeError('Unknown format option provided.');
    }
    format = opts.format;
  }
  const formatter: any = formats.formatters[format];

  let filter = defaults.filter;
  if (typeof opts.filter === 'function' || isArray(opts.filter)) {
    filter = opts.filter;
  }

  return {
    addQueryPrefix:
      typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
    allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
    charset: charset,
    charsetSentinel:
      typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
    delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
    encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
    encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
    encodeValuesOnly:
      typeof opts.encodeValuesOnly === 'boolean'
        ? opts.encodeValuesOnly
        : defaults.encodeValuesOnly,
    filter: filter,
    format: format,
    formatter: formatter,
    serializeDate:
      typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
    skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
    sort: typeof opts.sort === 'function' ? opts.sort : null,
    strictNullHandling:
      typeof opts.strictNullHandling === 'boolean'
        ? opts.strictNullHandling
        : defaults.strictNullHandling,
  };
};

export default function qsStringify(
  object: any,
  opts?: { arrayFormat: string; indices: any; commaRoundTrip: any }
) {
  let obj = object;
  const options = normalizeStringifyOptions(opts as any);

  let objKeys: any;
  let filter: (arg0: string, arg1: any) => any;

  if (typeof options.filter === 'function') {
    filter = options.filter;
    obj = filter('', obj);
  } else if (isArray(options.filter)) {
    filter = options.filter;
    objKeys = filter;
  }

  const keys: any[] = [];

  if (typeof obj !== 'object' || obj === null) {
    return '';
  }

  let arrayFormat: string;
  if (opts && opts.arrayFormat in arrayPrefixGenerators) {
    arrayFormat = opts.arrayFormat;
  } else if (opts && 'indices' in opts) {
    arrayFormat = opts.indices ? 'indices' : 'repeat';
  } else {
    arrayFormat = 'indices';
  }

  const generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
  if (opts && 'commaRoundTrip' in opts && typeof opts.commaRoundTrip !== 'boolean') {
    throw new TypeError('`commaRoundTrip` must be a boolean, or absent');
  }
  const commaRoundTrip = generateArrayPrefix === 'comma' && opts && opts.commaRoundTrip;

  if (!objKeys) {
    objKeys = Object.keys(obj);
  }

  if (options.sort) {
    objKeys.sort(options.sort);
  }

  const sideChannel = getSideChannel();
  for (let i = 0; i < objKeys.length; ++i) {
    const key = objKeys[i];

    if (options.skipNulls && obj[key] === null) {
      continue;
    }
    pushToArray(
      keys,
      stringify(
        obj[key],
        key,
        generateArrayPrefix,
        commaRoundTrip,
        options.strictNullHandling,
        options.skipNulls,
        options.encode ? options.encoder : null,
        options.filter,
        options.sort,
        options.allowDots,
        options.serializeDate,
        options.format,
        options.formatter,
        options.encodeValuesOnly,
        options.charset,
        sideChannel
      )
    );
  }

  const joined = keys.join(options.delimiter);
  let prefix = options.addQueryPrefix === true ? '?' : '';

  if (options.charsetSentinel) {
    if (options.charset === 'iso-8859-1') {
      // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
      prefix += 'utf8=%26%2310003%3B&';
    } else {
      // encodeURIComponent('✓')
      prefix += 'utf8=%E2%9C%93&';
    }
  }

  return joined.length > 0 ? prefix + joined : '';
}
