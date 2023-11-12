# API Documentation

## 1. `/upload`

- **Method:** POST
- **Parameter:**
  - `file` (in the request files)
- **Purpose:** Upload a file and convert it to a DataFrame (supports .csv and .xlsx formats).
- **Description:** This endpoint handles file uploads and converts the uploaded file to a DataFrame. It supports .csv and .xlsx file formats. If the file is successfully processed, the DataFrame is stored globally, and a success message is returned. If there is an error during file processing, an error message is returned.
- **End Result:** Returns a success message if the file is uploaded and converted successfully; otherwise, returns an error message.

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
