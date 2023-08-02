# useFilter

`useFilter` is a generic hook to filter any form of data on given parameters.

## Use case

### Define your items

    const  tabs: TabValuesType[] = [

        { label:  'NFTs', id:  0 },

        { label:  'Collections', id:  1 },

        { label:  'Collections', id:  5 },

        { label:  'Collections', id:  8 },

        { label:  'Categories', id:  2 },

        { label:  'Activities', id:  3 },

        { label:  'Portfolio', id:  4 },

    ];

### Use the hook

        const { filteredData, activeFilter } = useFilters({

    	    returnItems:  5, // how many items it should return

    	    totalGivenItems:  items, // array of items, whatever the type is

    	    key:  'label', // key on behalf of data would be filtered

    	    activeState:  'Collections', // active filter value

    	    filterSets: ['Collections', 'Portfolio'], // multiple filter values

        });

### Set filters and row data

    const { handleSetFilterData, handleFilter } = useFilters({ key:'label' })

    useEffect(()=>{

        handleSetFilterData(rowData)
        handleFilter(['Activities'])
        // also
        handleFilter(['Activities','Collections'])

    }, [rowData])
