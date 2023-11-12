# API Documentation
# File Management
## 1. `/upload`

- **Method:** POST
- **Parameter:**
  - `file` (in the request files)
- **Purpose:** Upload a file and convert it to a DataFrame (supports .csv and .xlsx formats).
- **Description:** This endpoint handles file uploads and converts the uploaded file to a DataFrame. It supports .csv and .xlsx file formats. If the file is successfully processed, the DataFrame is stored globally, and a success message is returned. If there is an error during file processing, an error message is returned.
- **End Result:** Returns a success message if the file is uploaded and converted successfully; otherwise, returns an error message.

# Data View
## 2. `/show_original`

- **Method:** GET
- **Purpose:** Display the original DataFrame.
- **Description:** This endpoint displays the original DataFrame. If the original DataFrame is not available, it returns a message indicating that there is no original DataFrame.
- **End Result:** Returns the HTML representation of the original DataFrame or a message indicating that there is no original DataFrame available.

## 3. `/show`

- **Method:** GET
- **Parameter:**
  - `column_values` (optional)
- **Purpose:** Display the DataFrame with optional selected columns.
- **Description:** This endpoint displays the DataFrame. If specific columns are provided as a parameter, it filters the DataFrame accordingly. If the DataFrame is not available, it returns a message indicating that there is no DataFrame.
- **End Result:** Returns the HTML representation of the DataFrame with optional column filtering or a message indicating that there is no DataFrame available.

## 4. `/show_head`

- **Method:** GET
- **Parameter:**
  - `head_value` (optional)
- **Purpose:** Display the first N rows of the DataFrame.
- **Description:** This endpoint displays the first N rows of the DataFrame. If the `head_value` parameter is provided, it shows the specified number of rows; otherwise, it shows the default number of rows. If the DataFrame is not available, it returns a message indicating that there is no DataFrame.
- **End Result:** Returns the HTML representation of the first N rows of the DataFrame or a message indicating that there is no DataFrame available.

## 5. `/show_tail`

- **Method:** GET
- **Parameter:**
  - `tail_value` (optional)
- **Purpose:** Display the last N rows of the DataFrame.
- **Description:** This endpoint displays the last N rows of the DataFrame. If the `tail_value` parameter is provided, it shows the specified number of rows; otherwise, it shows the default number of rows. If the DataFrame is not available, it returns a message indicating that there is no DataFrame.
- **End Result:** Returns the HTML representation of the last N rows of the DataFrame or a message indicating that there is no DataFrame available.

## 6. `/show_info`

- **Method:** GET
- **Purpose:** Display information about the DataFrame.
- **Description:** This endpoint displays information about the DataFrame, including data types, non-null counts, and memory usage. If the DataFrame is not available, it returns a message indicating that there is no DataFrame.
- **End Result:** Returns the information about the DataFrame or a message indicating that there is no DataFrame available.

## 7. `/show_dtypes`

- **Method:** GET
- **Purpose:** Display the data types of columns in the DataFrame.
- **Description:** This endpoint displays the data types of columns in the DataFrame. If the DataFrame is not available, it returns a message indicating that there is no DataFrame.
- **End Result:** Returns the data types of columns in the DataFrame or a message indicating that there is no DataFrame available.

## 8. `/show_describe`

- **Method:** GET
- **Purpose:** Display descriptive statistics of the DataFrame.
- **Description:** This endpoint displays descriptive statistics of the DataFrame, including count, mean, std, min, 25%, 50%, 75%, and max. If the DataFrame is not available, it returns a message indicating that there is no DataFrame.
- **End Result:** Returns the HTML representation of the descriptive statistics of the DataFrame or a message indicating that there is no DataFrame available.

## 9. `/show_shape`

- **Method:** GET
- **Purpose:** Display the shape of the DataFrame.
- **Description:** This endpoint displays the shape of the DataFrame (number of rows and columns). If the DataFrame is not available, it returns a message indicating that there is no DataFrame.
- **End Result:** Returns the shape of the DataFrame or a message indicating that there is no DataFrame available.

## 10. `/show_columns`

- **Method:** GET
- **Purpose:** Display the column names of the DataFrame.
- **Description:** This endpoint displays the column names of the DataFrame. If the DataFrame is not available, it returns a message indicating that there is no DataFrame.
- **End Result:** Returns the column names of the DataFrame or a message indicating that there is no DataFrame available.

## 11. `/show_sort_values`

- **Method:** GET
- **Parameter:**
  - `by_value` (required)
  - `sortOrder` (required)
- **Purpose:** Sort the DataFrame by specified column(s).
- **Description:** This endpoint sorts the DataFrame by the specified column(s) in the specified order. If the DataFrame is not available, it returns a message indicating that there is no DataFrame.
- **End Result:** Returns the HTML representation of the sorted DataFrame or a message indicating that there is no DataFrame available.

## 12. `/show_corr`

- **Method:** GET
- **Parameter:**
  - `method` (required, should be one of 'pearson', 'kendall', or 'spearman')
- **Purpose:** Display the correlation matrix of the DataFrame.
- **Description:** This endpoint calculates and displays the correlation matrix of the DataFrame using the specified correlation method ('pearson', 'kendall', or 'spearman'). If the DataFrame is not available, it returns a message indicating that there is no DataFrame.
- **End Result:** Returns the HTML representation of the correlation matrix or a message indicating that there is no DataFrame available.

## 13. `/group_by_column`

- **Method:** GET
- **Parameter:**
  - `column` (required, comma-separated)
  - `aggregation` (required, should be one of 'max', 'min', 'sum', 'avg', or 'count')
- **Purpose:** Perform group-by operation on specified column(s) with specified aggregation.
- **Description:** This endpoint performs a group-by operation on the specified column(s) using the specified aggregation method ('max', 'min', 'sum', 'avg', or 'count'). If the DataFrame is not available, it returns a message indicating that there is no DataFrame.
- **End Result:** Returns the HTML representation of the grouped DataFrame or a message indicating that there is no DataFrame available.

# Data Cleaning

## 14. `/show_isna`

- **Method:** GET
- **Purpose:** Display the count of missing values in the DataFrame.
- **Description:** This endpoint calculates and displays the count of missing values (NaN) in each column of the DataFrame. If the DataFrame is not available, it returns a message indicating that there is no DataFrame.
- **End Result:** Returns the HTML representation of the missing value counts or a message indicating that there is no DataFrame available.

## 15. `/show_fillna`

- **Method:** GET
- **Parameter:**
  - `target_column` (required)
  - `target_column_value` (required)
- **Purpose:** Fill missing values in the specified column with a given value.
- **Description:** This endpoint fills missing values in the specified column of the DataFrame with the provided value. If the DataFrame is not available or the specified column is not present, it returns a message indicating that there is no DataFrame or the column is invalid.
- **End Result:** Returns the HTML representation of the DataFrame with filled values or a message indicating that there is no DataFrame available.

## 16. `/show_ffill`

- **Method:** GET
- **Parameter:**
  - `target_column` (required)
- **Purpose:** Forward fill missing values in the specified column.
- **Description:** This endpoint forward fills missing values in the specified column of the DataFrame. If the DataFrame is not available or the specified column is not present, it returns a message indicating that there is no DataFrame or the column is invalid.
- **End Result:** Returns the HTML representation of the DataFrame with forward-filled values or a message indicating that there is no DataFrame available.

## 17. `/show_bfill`

- **Method:** GET
- **Parameter:**
  - `target_column` (required)
- **Purpose:** Backward fill missing values in the specified column.
- **Description:** This endpoint backward fills missing values in the specified column of the DataFrame. If the DataFrame is not available or the specified column is not present, it returns a message indicating that there is no DataFrame or the column is invalid.
- **End Result:** Returns the HTML representation of the DataFrame with backward-filled values or a message indicating that there is no DataFrame available.

## 18. `/dropna`

- **Method:** GET
- **Parameter:**
  - `criteria` (required)
    - Options:
      - `how_row`: Drop rows based on a specified condition
      - `how_col`: Drop columns based on a specified condition
      - `thresh_row`: Drop rows based on the threshold
      - `thresh_col`: Drop columns based on the threshold
  - `how` (required for `how_row` and `how_col`)
  - `thresh` (required for `thresh_row` and `thresh_col`)
- **Purpose:** Drop rows or columns based on specified conditions or thresholds.
- **Description:** This endpoint drops rows or columns based on the specified criteria. It supports dropping rows based on conditions ('how_row'), dropping columns based on conditions ('how_col'), dropping rows based on a threshold ('thresh_row'), and dropping columns based on a threshold ('thresh_col'). If the DataFrame is not available, it returns a message indicating that there is no DataFrame.
- **End Result:** Returns the HTML representation of the DataFrame after dropping rows or columns or a message indicating that there is no DataFrame available.

## 19. `/drop`

- **Method:** GET
- **Parameter:**
  - `drop_type` (required)
    - Options:
      - `row`: Drop specified row numbers
      - `column`: Drop specified column names
  - `row_numbers` (required for `row`)
  - `column_names` (required for `column`)
- **Purpose:** Drop specified rows or columns from the DataFrame.
- **Description:** This endpoint drops specified rows or columns from the DataFrame based on the specified drop type. It supports dropping rows by providing row numbers ('row') and dropping columns by providing column names ('column'). If the DataFrame is not available, it returns a message indicating that there is no DataFrame.
- **End Result:** Returns the HTML representation of the DataFrame after dropping specified rows or columns or a message indicating that there is no DataFrame available.

## 20. `/show_drop_duplicates`

- **Method:** GET
- **Parameter:**
  - `parameters` (required)
    - Options:
      - `first`: Keep the first occurrence of duplicates
      - `last`: Keep the last occurrence of duplicates
- **Purpose:** Display the DataFrame after dropping duplicate rows.
- **Description:** This endpoint drops duplicate rows from the DataFrame based on the specified parameters ('first' or 'last'). If the DataFrame is not available, it returns a message indicating that there is no DataFrame.
- **End Result:** Returns the HTML representation of the DataFrame after dropping duplicate rows or a message indicating that there is no DataFrame available.

## 21. `/show_duplicates`

- **Method:** GET
- **Purpose:** Display information about duplicate rows in the DataFrame.
- **Description:** This endpoint identifies and displays information about duplicate rows in the DataFrame. If duplicate rows are found, it returns a JSON representation of the duplicate rows; otherwise, it returns a message indicating that no duplicates were found. If the DataFrame is not available, it returns a message indicating that there is no DataFrame.
- **End Result:** Returns a JSON representation of duplicate rows or a message indicating that there are no duplicates or no DataFrame available.

## 22. `/show_reset_index`

- **Method:** GET
- **Purpose:** Reset the index of the DataFrame.
- **Description:** This endpoint resets the index of the DataFrame. If the DataFrame is not available, it returns a message indicating that there is no DataFrame.
- **End Result:** Returns the HTML representation of the DataFrame with reset index or a message indicating that there is no DataFrame available.

## 23. `/logs`

- **Method:** GET
- **Purpose:** Display logs.
- **Description:** This endpoint returns the logs generated during the API requests. If no logs are available, it returns a message indicating that there are no logs.
- **End Result:** Returns the logs or a message indicating that there are no logs available.

# Data Visualization

## 24. `/show_bar`

- **Method:** GET
- **Parameters:**
  - `row` (required)
  - `col` (required)
  - `color` (optional)
- **Purpose:** Display a bar chart.
- **Description:** This endpoint generates a bar chart using the specified row and column from the DataFrame. If the color parameter is provided, it uses the specified colors for the bars. The resulting chart is returned as a base64-encoded PNG image.
- **End Result:** Returns the HTML representation of the bar chart or an error message if an exception occurs.

## 25. `/show_scatter`

- **Method:** GET
- **Parameters:**
  - `row` (required)
  - `col` (required)
- **Purpose:** Display a scatter plot.
- **Description:** This endpoint generates a scatter plot using the specified row and column from the DataFrame. The resulting chart is returned as a base64-encoded PNG image.
- **End Result:** Returns the HTML representation of the scatter plot or an error message if an exception occurs.

## 26. `/show_line`

- **Method:** GET
- **Parameters:**
  - `row` (required)
  - `col` (required)
- **Purpose:** Display a line chart.
- **Description:** This endpoint generates a line chart using the specified row and column from the DataFrame. The resulting chart is returned as a base64-encoded PNG image.
- **End Result:** Returns the HTML representation of the line chart or an error message if an exception occurs.

## 27. `/show_boxplot`

- **Method:** GET
- **Purpose:** Display a box plot.
- **Description:** This endpoint generates a box plot from the DataFrame. The resulting chart is returned as a base64-encoded PNG image.
- **End Result:** Returns the HTML representation of the box plot or an error message if an exception occurs.

## 28. `/show_area`

- **Method:** GET
- **Parameters:**
  - `row` (required)
  - `col` (required)
- **Purpose:** Display an area plot.
- **Description:** This endpoint generates an area plot using the specified row and column from the DataFrame. The resulting chart is returned as a base64-encoded PNG image.
- **End Result:** Returns the HTML representation of the area plot or an error message if an exception occurs.

## 29. `/show_violin`

- **Method:** GET
- **Purpose:** Display a violin plot.
- **Description:** This endpoint generates a violin plot from the DataFrame. The resulting chart is returned as a base64-encoded PNG image.
- **End Result:** Returns the HTML representation of the violin plot or an error message if an exception occurs.

# Data Output

## 30. `/show_json`

- **Method:** GET
- **Purpose:** Display the DataFrame in JSON format.
- **Description:** This endpoint converts the DataFrame to JSON format and returns the HTML representation.
- **End Result:** Returns the HTML representation of the DataFrame in JSON format or an error message if an exception occurs.

## 31. `/show_xml`

- **Method:** GET
- **Purpose:** Display the DataFrame in XML format.
- **Description:** This endpoint converts the DataFrame to XML format and returns the HTML representation.
- **End Result:** Returns the HTML representation of the DataFrame in XML format or an error message if an exception occurs.

## 32. `/show_parquet`

- **Method:** GET
- **Purpose:** Display the DataFrame in Parquet format.
- **Description:** This endpoint converts the DataFrame to Parquet format and returns the HTML representation.
- **End Result:** Returns the HTML representation of the DataFrame in Parquet format or an error message if an exception occurs.

## 33. `/show_latex`

- **Method:** GET
- **Purpose:** Display the DataFrame in LaTeX format.
- **Description:** This endpoint converts the DataFrame to LaTeX format and returns the HTML representation.
- **End Result:** Returns the HTML representation of the DataFrame in LaTeX format or an error message if an exception occurs.

## 34. `/show_tsv`

- **Method:** GET
- **Purpose:** Display the DataFrame in TSV (Tab-Separated Values) format.
- **Description:** This endpoint converts the DataFrame to TSV format and returns the HTML representation.
- **End Result:** Returns the HTML representation of the DataFrame in TSV format or an error message if an exception occurs.

