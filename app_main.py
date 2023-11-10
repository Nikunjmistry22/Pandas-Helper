from flask import Flask, render_template,request,jsonify
import pandas as pd
import openpyxl,secrets
from io import StringIO
app = Flask(__name__)

secret_key = secrets.token_urlsafe(16)
# Set the secret key for the Flask app
app.config['SECRET_KEY'] = secret_key
logs=''
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    global df,original,logs
    global new_df
    if 'file' not in request.files:
        return 'No file part', 400
    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400
    else:
        if file.filename.endswith('.csv'):
            logs += f"Uploaded file: {file.filename}\ndf = pd.read_csv('{file.filename}')\n"
            df=pd.read_csv(file)
        elif file.filename.endswith('.xlsx'):
            df = pd.read_excel(file)
    original=df.copy()

    # Process the uploaded file here, save it, and return an appropriate response
    # Example: file.save('uploads/' + file.filename)
    return 'File uploaded successfully and converted in Dataframe'

@app.route('/show_original')
def show_original():
    global original
    try:
        if original is not None:

            return original.to_html()
        else:
            return 'No original DataFrame available.'
    except Exception as e:
        return 'Error: ' + str(e)

@app.route('/show')
def show():
    global df,new_df
    # try:
    #     if df is not None:
    #         df=new_df
    #         return df.to_html()
    #     else:
    #         return 'No DataFrame available.'
    # except ValueError:
    #     return 'Invalid head value.'
    columns = request.args.get('column_values')
    if df is not None:
        if columns:
            columns_list = columns.split(',')
            df = df[columns_list]
            return new_df.to_html()
        else:
            return df.to_html()
    else:
        return 'No DataFrame available.'


@app.route('/show_head')
def show_head():
    global df,logs
    global new_df
    head_value = request.args.get('head_value')  # Get the 'head_value' from the query parameters
    try:
        if df is not None:
            if head_value:
                new_df=df.head(int(head_value))
                df=new_df
                logs += f"df = df.head({head_value})\n"
                return df.head(int(head_value)).to_html()
            else:
                new_df=df.head()
                df=new_df
                logs += f"df = df.head()\n"
                return df.head().to_html()
        else:
            return 'No DataFrame available.'
    except ValueError:
        return 'Invalid head value.'

@app.route('/show_tail')
def show_tail():
    global df,logs
    tail_value = request.args.get('tail_value')  # Get the 'head_value' from the query parameters
    try:
        if df is not None:
            if tail_value:
                new_df = df.tail(int(tail_value))
                df = new_df
                logs += f"df = df.tail({tail_value})\n"
                return df.tail(int(tail_value)).to_html()
            else:
                new_df = df.tail()
                df = new_df
                logs += f"df = df.tail()\n"
                return df.tail().to_html()
        else:
            return 'No DataFrame available.'
    except ValueError:
        return 'Invalid head value.'

@app.route('/show_info')
def show_info():
    global df,logs
    try:
        if df is not None:
            buffer = StringIO()

            df.info(buf=buffer)
            logs += f"df.info()\n"
            return buffer.getvalue()
        else:
            return 'No DataFrame available.'
    except ValueError:
        return 'Invalid head value.'


@app.route('/show_dtypes')
def show_dtypes():
    global df,logs
    try:
        if df is not None:
            logs += f"df.dtypes\n"
            return df.dtypes.to_string()
        else:
            return 'No DataFrame available.'
    except ValueError:
        return 'Invalid head value.'


@app.route('/show_describe')
def show_describe():
    global df,new_df,logs
    try:
        if df is not None:
            new_df=df
            logs += f"df.describe()\n"
            return new_df.describe().to_html()

        else:
            return 'No DataFrame available.'
    except ValueError:
        return 'Invalid head value.'

@app.route('/show_shape')
def show_shape():
    global df,new_df,logs
    try:
        if df is not None:
            buffer = StringIO()  # Creating a StringIO buffer
            # Getting the shape of the DataFrame and storing it in the buffer
            new_df=df
            new_df_shape = new_df.shape
            buffer.write(str(new_df_shape))
            logs += f"df.shape\n"
            return buffer.getvalue()
        else:
            return 'No DataFrame available.'
    except ValueError:
        return 'Invalid head value.'

@app.route('/show_columns')
def show_columns():
    global df,logs
    try:
        if df is not None:
            buffer = StringIO()  # Creating a StringIO buffer

            # Getting the shape of the DataFrame and storing it in the buffer
            df_columns = df.columns.tolist()
            buffer.write(str(df_columns))
            logs += f"df.columns\n"
            return buffer.getvalue()
        else:
            return 'No DataFrame available.'
    except ValueError:
        return 'Invalid head value.'
@app.route('/show_sort_values')
def show_sort_values():
    global df, new_df
    by_value = request.args.get('by_value')
    ascending = request.args.get('sortOrder')

    try:
        if df is not None:
            ascending = ascending.lower() == "true"  # Convert the string value to a Boolean
            new_df = df.sort_values(by=by_value, ascending=ascending)
            df = new_df
            return df.to_html()
        else:
            return 'No DataFrame available.'
    except Exception as e:
        return 'Error: ' + str(e)

@app.route('/show_corr')
def show_corr():
    global df
    method = request.args.get('method')
    try:
        if df is not None:
            if method == 'pearson':
                correlation = df.corr(method='pearson')
            elif method == 'kendall':
                correlation = df.corr(method='kendall')
            elif method == 'spearman':
                correlation = df.corr(method='spearman')
            else:
                return 'Invalid method'

            return correlation.to_html()
        else:
            return 'No DataFrame available.'
    except Exception as e:
        return 'Error: ' + str(e)

@app.route('/group_by_column')
def group_by_column():
    global df, new_df
    column = request.args.get('column')
    aggregation = request.args.get('aggregation')

    try:
        if df.empty:
            return 'No DataFrame available.'
        else:
            new_df = df.copy()  # Create a copy of the original DataFrame
            if aggregation == 'max':
                df= new_df.groupby(column).max()
                return df.to_html()
            elif aggregation == 'min':
                df= new_df.groupby(column).min()
                return df.to_html()
            elif aggregation == 'sum':
                df= new_df.groupby(column).sum()
                return df.to_html()
            elif aggregation == 'avg':
                df= new_df.groupby(column).mean()
                return df.to_html()
            elif aggregation == 'count':
                df = new_df.groupby(column).size().reset_index(name='count')
                # df = df[df['count'] == df['count'].max()]
                df.columns = [column, 'count']
                return df.to_html()

            else:
                return 'Invalid Aggregation Method'
    except Exception as e:
        return 'Error: ' + str(e)


#=========================== Data Cleaning Endpoints======================================

@app.route('/show_isna')
def show_isna():
    global df,new_df
    try:
        if df is not None:
            return df.isna().sum().reset_index().to_html()

        else:
            return 'No DataFrame available.'
    except ValueError:
        return 'Invalid head value.'

@app.route('/show_fillna')
def show_fillna():
    global df,new_df
    target_column = request.args.get('target_column')  # Get the value of 'target_column'
    target_column_value = request.args.get('target_column_value')  # Get the value of 'target_column_value'
    try:
        if df is not None and target_column in df.columns:
            # Modify the specified column with the filled values
            df[target_column] = df[target_column].fillna(value=target_column_value)
            return df.to_html()
        else:
            return 'No DataFrame available.'
    except Exception as e:
        return 'Error: ' + str(e)


@app.route('/show_ffill')
def show_ffill():
    global df,new_df
    target_column = request.args.get('target_column')  # Get the value of 'target_column'
    # target_column_value = request.args.get('target_column_value')  # Get the value of 'target_column_value'
    try:
        if df is not None and target_column in df.columns:
            # Modify the specified column with the filled values
            df[target_column] = df[target_column].fillna(method='ffill')
            return df.to_html()
        else:
            return 'No DataFrame available.'
    except Exception as e:
        return 'Error: ' + str(e)


@app.route('/show_bfill')
def show_bfill():
    global df,new_df
    target_column = request.args.get('target_column')  # Get the value of 'target_column'
    # target_column_value = request.args.get('target_column_value')  # Get the value of 'target_column_value'
    try:
        if df is not None and target_column in df.columns:
            # Modify the specified column with the filled values
            df[target_column] = df[target_column].fillna(method='bfill')
            return df.to_html()
        else:
            return 'No DataFrame available.'
    except Exception as e:
        return 'Error: ' + str(e)


@app.route('/dropna')
def dropna():
    global df,new_df

    criteria = request.args.get('criteria')

    try:
        if df is not None:
            if criteria.startswith('how_row'):
                how_value = request.args.get('how')
                if how_value == 'any':
                    df = df.dropna(how='any')
                elif how_value == 'all':
                    df = df.dropna(how='all')
                else:
                    return 'Invalid how value'

                return df.to_html()
            elif criteria.startswith('how_col'):
                how_value = request.args.get('how')
                if how_value == 'any':
                    df = df.dropna(axis=1,how='any')
                elif how_value == 'all':
                    df = df.dropna(axis=1,how='all')
                else:
                    return 'Invalid how value'

                return df.to_html()

            elif criteria.startswith('thresh_row'):
                thresh_value = request.args.get('thresh')
                if thresh_value:
                    thresh_value = int(thresh_value)  # Assuming the threshold is an integer
                    df = df.dropna(thresh=thresh_value)
                else:
                    return 'Threshold value not provided'

                return df.to_html()
            elif criteria.startswith('thresh_col'):
                thresh_value = request.args.get('thresh')
                if thresh_value:
                    thresh_value = int(thresh_value)  # Assuming the threshold is an integer
                    df = df.dropna(axis=1,thresh=thresh_value)
                else:
                    return 'Threshold value not provided'

                return df.to_html()
            else:
                return 'Invalid criteria'
        else:
            return 'No DataFrame available.'
    except Exception as e:
        return 'Error: ' + str(e)

@app.route('/drop', methods=['GET'])
def drop():
    global df

    drop_type = request.args.get('drop_type')

    if df is not None:
        try:
            if drop_type == 'row':
                row_numbers = request.args.get('row_numbers').split(',')
                for row_number in row_numbers:
                    if row_number:
                        df.drop(df.index[int(row_number)], inplace=True)
                return df.to_html()

            elif drop_type == 'column':
                column_names = request.args.get('column_names').split(',')
                for column_name in column_names:
                    if column_name in df.columns:
                        df.drop(column_name, axis=1, inplace=True)
                return df.to_html()

            else:
                return 'Invalid drop type'

        except Exception as e:
            return 'Error: ' + str(e)

    else:
        return 'No DataFrame available'


@app.route('/show_drop_duplicates')
def show_drop_duplicates():
    global df
    parameters = request.args.get('parameters')
    try:
        if df is not None:
            if parameters == 'first':
                df = df.drop_duplicates(keep='first')
            elif parameters == 'last':
                df=df.drop_duplicates(keep='last')
            else:
                return 'Invalid method'

            return df.to_html()
        else:
            return 'No DataFrame available.'
    except Exception as e:
        return 'Error: ' + str(e)


@app.route('/show_duplicates')
def show_duplicates():
    global df
    try:
        if df is not None:
            duplicates = df[df.duplicated(keep=False)]
            if not duplicates.empty:
                duplicate_indices = duplicates.index.tolist()
                return jsonify({'duplicates': duplicates.to_dict(orient='index')})
            else:
                return 'No duplicates found.'
        else:
            return 'No DataFrame available.'
    except pd.errors.EmptyDataError:
        return 'DataFrame is empty.'
    except Exception as e:
        return 'Error: ' + str(e)


@app.route('/show_resetindex')
def show_reset_index():
    global df
    try:
        if df is not None:
            df=df.reset_index(drop=True)
            return df.to_html()
        else:
            return 'No DataFrame available.'
    except pd.errors.EmptyDataError:
        return 'DataFrame is empty.'
    except Exception as e:
        return 'Error: ' + str(e)

@app.route('/logs')
def show_logs():
    return logs
if __name__ == '__main__':
    app.run(debug=True)
