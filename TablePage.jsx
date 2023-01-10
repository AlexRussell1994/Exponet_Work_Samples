
// represents a page that displays the data provided to it in table form

/* Usage Instructions:
 *
 * place the following code in parent component's mapStateToProps:
   tableRows: [[your choice of selector]](state),
 *
 * place the following code where you want your table:
   <TablePage
       tableName= [[a unique string, used internally to identify this table's local storage]]
       tableRows={this.props.tableRows}
       tableColumnHeads={[
               [[an array of column heads, created through calls to Layout.columnHead(...)]]
           ]}
       tableRow={(row, index) => <React.Fragment>
               [[a series of <TableCell>s representing a row in your table]]
           </React.Fragment>}
   />
 *
 * add optional props as necessary
 */

/* Required Props:
 *
 * // this is a name for the table, used internally to identify this table's local storage
   tableName= [[a string unique among all TablePages in the program]]
 *
 * // this is an array of the rows that the table will display
   tableRows={this.props.tableRows}
 *
 * // this is an array of column heads that go across the top of the table
   tableColumnHeads={ [[an array of column heads, created through calls to Layout.columnHead(...)]] }
 * Note: table heads should be created through calls to Layout.columnHead(...) from LayoutObject.jsx
 * Note: the number of entries in the tableColumnHeads array should match the number of <TableCell>s in tableRow
 * Note: setting text and id to null when calling Layout.columnHead(...) disables sorting by that table head
 *
 * // this is a function that returns a series of TableCells in a <React.Fragment> it is used to create each row of the table
   tableRow={(row, index) => <React.Fragment> [[a series of <TableCell>s representing a row in your table]] </React.Fragment>}
 * Note: do not have the function return a TableRow. If you need to add an on-double-click to the row, use onRowDoubleClick below.
 */

/* Optional Props:
 *
 * // providing this parameter enables pagination, the string itself is displayed next to the page count
   paginationText= [[String to show next to pagination]]
 *
 * // this sets the default column to sort the table by
   defaultSortBy= [[Sting id of column to sort by]]
 *
 * // this is a method which the table will call to fetch data to display
   rowFetcher={(filters) => { [[a function that fetches content for the table to display]] }}
 *  - for this to work, the method should populate the contents of the tableRows prop
 *  - this method is called once when the table loads (constructor) and once whenever refetchFilters changes
 *  - filters contains objects which can be accessed with filters[i].name and filters[i].value
 *
 * // a set of filters which, if changed, should trigger rowFetcher to be called
   refetchFilters={ [[ an array of strings that are filter names ]] }
 *
 * // enables a field to search the table by
 * // the search does nothing without at least one of: searchString, smartSearchRows, and smartSearches
   hasSearchField
 *
 * // with hasSearchField, enables search to show only rows in tableRows which match the contents of the search field
 * // the function provided should return a string that contains all the text in the row that should be searched
   searchStrings={(row) => [[an array of strings representing the row's contents]] }
 *
 * // the rows found through a smart search
 * // when a smart search is matched, these rows are displayed instead of the normal contents of the table, and ignore filters
 * // these would typically have been fetched from a server through a smartSearch
   smartSearchRows={ [[an array of table row data]] }
 *
 * // an array of smart searches created through calls to Search.newSmartSearch(...)
 * // when a regular expression provided is matched by the search field, the function provided is called,
 * // and the contents of martSearchRows is displayed
   smartSearches={ [[an array of smart searches created through calls to Search.newSmartSearch(...)]] }
 *
 * // tableEvents props, which facilitate providing instructions to the table
   eventsVariable={this.state.tableEvents}
   setEventsVariable={(newState) => {this.setState({tableEvents: newState})}}
 *  - currently only used to manually set the value of a filter
 *  - also required tableEvents = [] be added to the parent component's state
 *
 * // the filters to apply to the table's data
   filters={ [[an array of filters created through calls to Filter.createFilter(...)]] }
 * Note: these filters do not automatically display, instead either:
 *  - their names need to be provided to other props which will handle displaying them, or
 *  - they can be updated through calls to the following function, added to the parent component, if tableEvents props are provided:
   updateTableFilter = (name, value) => {this.setState({tableEvents: [...this.state.tableEvents, Filter.filterUpdateEvent(name, value)]})}
 *      Note: if multiple filters are updated via tableEvents at the same time, calling this function repeatedly will
 *          cause the updates to overwrite each other before the table processes them,
 *          if this happens, you can write a custom function in the style of this one that updates all filters at once
 *          just make sure you only call setState on tableEvents once
 * Note: a filter of type containedBy has a value that is an array, not a string
 *          likewise, a filter of type containsMemberOf has a value that is an array, and compares to an array as well
 *
 * // checkboxes to be displayed above the table - can (and should) be connected to filters
   filterCheckboxes={ [[an array of checkBoxes created through calls to Layout.checkBox(...)]] }
 *
 * // a dropdown of filters to be applied to the table
   filterDropdown={ [[a layout created through a call to Layout.newLayout(...) ]] }
 *      the layout should be created through a call to Layout.newLayout(rowWidth, rows)
 *      the rows parameter should be an array of rows created through calls to Layout.row(rowElements)
 *      the rowElements parameter should be an array of rowElements created through calls to Layout.rowElement(...)
 *          rowElement style should be from Layout.elementStyle
 *          dropdownOptions is an array of strings, and only needs to be provided if style is checkboxDropdown
 *      the combined widths of rowElements in a row should equal the rowWidth of the layout
 *          a width of 1 corresponds to 300px (unless it's been changed in LayoutObject.jsx, or dynamic adjusting is set to true)
 *          decimal widths are allowed
   applyFilterDropdownChangesImmediately
    - this can be used to skip the need to save changes to the filter dropdown
 *
 * // performs a method when a row is double-clicked
   onRowDoubleClick={ [[a method to call when a row is double-clicked]] }
 *      the method has the form: methodName = (row) => {}
 *
 * // enables a field to select a user's location. selected location is changed across the entire client
   hasLocationField
 * Note: this uses a <LocationSelectBox/> from LocationSelectBox.jsx, and its usual instructions apply
 *      listAvailableLocations (in actions/settings) should be called in the parent component's componentDidMount()
 *      to access the selected location add selectedLocation: selectedLocationIdSelector(state) to the parent component's mapStateToProps
 * Note: The table does not automatically sort by selected location.
 *      To sort by location, create a filter and provide the selected location to it through the parent component's componentDidUpdate(...)
 *      see "filters" above for a method to do so
 *
 * // enables some try/catch blocks and can be helpful for debugging
   debug
 *
 */

/* Example Use:

    <TablePage
        tableName="GenericTable"

        tableRows={this.props.tableRows}
        rowFetcher={(filters) => {this.props.listGenericRows()}}

        tableColumnHeads={this.getTableHeaders()}
        tableRow={this.tableRow}

        paginationText={ROWS_PER_PAGE_LABEL}

        defaultSortBy={DEFAULT_SORT_BY_HEAD_CELL}

        hasSearchField
        searchStrings={this.searchStrings}

        filters={[
            Filter.createFilter("genericFilter1", (row) => row.relevantValue, null, Filter.relations.containedBy, true),
            Filter.createFilter("genericFilter2", (row) => (row.relevantValue > 1), null, Filter.relations.equals, false)
        ]}

        filterCheckboxes={[
            Layout.checkBox("genericFilter2", GENERIC_CHECKBOX_TEXT_STRING)
        ]}

        filterDropdown={
            Layout.newLayout(1, [
                Layout.row([
                    Layout.rowElement(1, "genericFilter1", "Generic Filter 1", Layout.elementStyle.checkboxDropdown, this.state.genericFilterDropdownOptions)
                ])
            ])
        }

        applyFilterDropdownChangesImmediately
    />

*/

// ----

class TablePage {
    // implementation redacted
}

