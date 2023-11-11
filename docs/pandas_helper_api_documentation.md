# Pandas Helper API Documentation

## Overview

Pandas Helper is a web application built using Flask that provides a user-friendly interface for working with Pandas, a popular data manipulation library in Python. This API documentation outlines the available endpoints and their functionalities categorized into different sections based on their purposes.

### Categories


1. **Data Cleaning**
2. **Data Output**
3. **Data View**
4. **Data Manipulation**
5. **Data Visualization**
6. **Logging**


---

## Data Cleaning

### 1. Show NaN Values

- **Endpoint:** `/show_isna`
- **Method:** GET
- **Parameters:** None
- **Description:** Displays the count of NaN values for each column in the DataFrame.

### 2. Fill NaN Values

- **Endpoint:** `/show_fillna`
- **Method:** GET
- **Parameters:**
  - `target_column`: Column to fill NaN values in.
  - `target_column_value`: Value to fill in NaN places.
- **Description:** Fills NaN values in the specified column with the provided value.

### 3. Forward Fill NaN Values

- **Endpoint:** `/show_ffill`
- **Method:** GET
- **Parameters:**
  - `target_column`: Column to forward fill NaN values.
- **Description:** Forward fills NaN values in the specified column.

### 4. Backward Fill NaN Values

- **Endpoint:** `/show_bfill`
- **Method:** GET
- **Parameters:**
  - `target_column`: Column to backward fill NaN values.
- **Description:** Backward fills NaN values in the specified column.

### 5. Drop NaN Values

- **Endpoint:** `/dropna`
- **Method:** GET
- **Parameters:**
  - `criteria`: Type of drop operation ('how_row', 'how_col', 'thresh_row', 'thresh_col').
  - For 'how_row' and 'how_col':
    - `how`: 'any' or 'all'.
  - For 'thresh_row' and 'thresh_col':
    - `thresh`: Threshold value.
- **Description:** Drops rows or columns based on specified criteria.

### 6. Drop Rows or Columns

- **Endpoint:** `/drop`
- **Method:** GET
- **Parameters:**
  - `drop_type`: 'row' or 'column'.
  - For 'row':
    - `row_numbers`: Comma-separated row numbers.
  - For 'column':
    - `column_names`: Comma-separated column names.
- **Description:** Drops specified rows or columns from the DataFrame.

### 7. Show Duplicates

- **Endpoint:** `/show_duplicates`
- **Method:** GET
- **Parameters:** None
- **Description:** Displays duplicated rows in the DataFrame.

### 8. Drop Duplicates

- **Endpoint:** `/show_drop_duplicates`
- **Method:** GET
- **Parameters:**
  - `parameters`: 'first' or 'last' (optional).
- **Description:** Drops duplicate rows based on specified parameters.

### 9. Reset Index

- **Endpoint:** `/show_resetindex`
- **Method:** GET
- **Parameters:** None
- **Description:** Resets the index of the DataFrame.

---

## Data Output

### 1. JSON Representation

- **Endpoint:** `/show_json`
- **Method:** GET
- **Parameters:** None
- **Description:** Displays the DataFrame in JSON format.

### 2. XML Representation

- **Endpoint:** `/show_xml`
- **Method:** GET
- **Parameters:** None
- **Description:** Displays the DataFrame in XML format.

### 3. Parquet Format

- **Endpoint:** `/show_parquet`
- **Method:** GET
- **Parameters:** None
- **Description:** Displays the DataFrame in Parquet format.

### 4. LaTeX Representation

- **Endpoint:** `/show_latex`
- **Method:** GET
- **Parameters:** None
- **Description:** Displays the DataFrame in LaTeX format.

### 5. Tab-Separated Values (TSV)

- **Endpoint:** `/show_tsv`
- **Method:** GET
- **Parameters:** None
- **Description:** Displays the DataFrame in TSV format.

---

## Data View

### 1. Show Original DataFrame

- **Endpoint:** `/show_original`
- **Method:** GET
- **Parameters:** None
- **Description:** Displays the original DataFrame uploaded.

### 2. Show DataFrame Head

- **Endpoint:** `/show_head`
- **Method:** GET
- **Parameters:**
  - `head_value`: Number of rows to display (optional).
- **Description:** Displays the first few rows of the DataFrame.

### 3. Show DataFrame Tail

- **Endpoint:** `/show_tail`
- **Method:** GET
- **Parameters:**
  - `tail_value`: Number of rows to display (optional).
- **Description:** Displays the last few rows of the DataFrame.

### 4. Show DataFrame Info

- **Endpoint:** `/show_info`
- **Method:** GET
- **Parameters:** None
- **Description:** Displays the information about the DataFrame.

### 5. Show DataFrame Data Types

- **Endpoint:** `/show_dtypes`
- **Method:** GET
- **Parameters:** None
- **Description:** Displays the data types of each column in the DataFrame.

### 6. Show DataFrame Description

- **Endpoint:** `/show_describe`
- **Method:** GET
- **Parameters:** None
- **Description:** Displays descriptive statistics of the DataFrame.

### 7. Show DataFrame Shape

- **Endpoint:** `/show_shape`
- **Method:** GET
- **Parameters:** None
- **Description:** Displays the shape of the DataFrame.

### 8. Show DataFrame Columns

- **Endpoint:** `/show_columns`
- **Method:** GET
- **Parameters:** None
- **Description:** Displays the column names of the DataFrame.

### 9. Show Sorted Values

- **Endpoint:** `/show_sort_values`
- **Method:** GET
- **Parameters:**
  - `by_value`: Column to sort by.
  - `sortOrder`: Sorting order ('true' for ascending, 'false' for descending).
- **Description:** Displays the DataFrame with sorted values.

### 10. Show Correlation Matrix

- **Endpoint:** `/show_corr`
- **Method:** GET
- **Parameters:**
  - `method`: Correlation method ('pearson', 'kendall', 'spearman').
- **Description:** Displays the correlation matrix of the DataFrame.

### 11. Group by Column

- **Endpoint:** `/group_by_column`
- **Method:** GET
- **Parameters:**
  - `column`: Column to group by.
  - `aggregation`: Aggregation method ('max', 'min', 'sum', 'avg', 'count').
- **Description:** Groups the DataFrame by a column with specified aggregation.

---

## Data Manipulation

The data manipulation category includes endpoints for manipulating DataFrame columns and values.

---

## Data Visualization

The data visualization category includes endpoints for generating various types of plots and visualizations using the Matplotlib library.

---

## Logging

### 1. Show Logs

- **Endpoint:** `/logs`
- **Method:** GET
- **Parameters:** None
- **Description:** Displays the logs of operations performed on the DataFrame.

---

## Example Usage

### 1. Uploading a File

- **Endpoint:** `/upload`
- **Method:** POST
- **Parameters:**
  - `file`: File to upload (CSV or Excel).
- **Description:** Uploads a file and converts it into a DataFrame.

### 2. Show Bar Chart

- **Endpoint:** `/show_bar`
- **Method:** GET
- **Parameters:**
  - `row`: X-axis values.
  - `col`: Y-axis values.
  - `color`: Bar colors (optional).
- **Description:** Displays a bar chart based on specified columns.

---

## Notes

- The API provides both DataFrame representation and visualizations, making it a versatile tool for data analysis.
- Endpoints often support optional parameters for customization.
- Check the response for any errors or issues during API requests.

---

Feel free to explore and use the Pandas Helper API to interact with your data effectively!
