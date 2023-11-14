from flask import Flask, render_template,request,jsonify,Markup
import pandas as pd
import openpyxl,secrets
import matplotlib,json
matplotlib.use('agg')
import matplotlib.pyplot as plt
from io import StringIO,BytesIO
import base64
import warnings
warnings.filterwarnings("ignore")
app = Flask(__name__)

secret_key = secrets.token_urlsafe(16)
# Set the secret key for the Flask app
app.config['SECRET_KEY'] = secret_key
logs=f"import pandas as pd\nimport matplotlib\nmatplotlib.use('tkagg')\nimport matplotlib.pyplot as plt\n"
dataframes = {}
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    global df, original, logs
    if 'file' not in request.files:
        return 'No file part', 400

    file = request.files['file']

    if file.filename == '':
        return 'No selected file', 400

    try:
        if file.filename.endswith('.csv'):
            df = pd.read_csv(file)
            logs += f"#Uploaded file: {file.filename}\ndf = pd.read_csv('{file.filename}')\noriginal=df\n"
        elif file.filename.endswith('.xlsx'):
            df = pd.read_excel(file)
            logs += f"#Uploaded file: {file.filename}\ndf = pd.read_excel('{file.filename}')\noriginal=df\n"

        else:
            raise ValueError("Unsupported file format. Please upload a .csv or .xlsx file.")

        original = df.copy()
        return 'File uploaded successfully and converted to DataFrame'

    except Exception as e:
        return f'Error during file processing: {str(e)}', 500


@app.route('/show_original')
def show_original():
    global original,logs
    try:
        if original is not None:
            logs += f"original\n"
            return Markup(original.to_html())
        else:
            return 'No original DataFrame available.'
    except Exception as e:
        return 'Error: ' + str(e)

@app.route('/show')
def show():
    global df,new_df,logs
    try:
        # Uncomment the following lines if you want to handle ValueError specifically
        # if df is not None:
        #     df = new_df
        #     return df.to_html()
        # else:
        #     return 'No DataFrame available.'

        columns = request.args.get('column_values')
        if df is not None:
            if columns:
                columns_list = columns.split(',')
                df = df[columns_list]
                logs += f"df[{columns_list}'\n"
                return Markup(new_df.to_html())
            else:
                return Markup(df.to_html())
        else:
            return 'No DataFrame available.'

    except Exception as e:
        return f'Error during show: {str(e)}', 500


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
                logs += f"df=df.head({head_value})\n"
                return Markup(df.head(int(head_value)).to_html())
            else:
                new_df=df.head()
                df=new_df
                logs += f"df=df.head()\n"
                return Markup(df.head().to_html())
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
                logs += f"df=df.tail({tail_value})\n"
                return Markup(df.tail(int(tail_value)).to_html())
            else:
                new_df = df.tail()
                df = new_df
                logs += f"df=df.tail()\n"
                return Markup(df.tail().to_html())
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
            return Markup(new_df.describe().to_html())

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
@app.route('/show_sort_values', methods=['GET'])
def show_sort_values():
    global df,logs

    try:
        if df is not None:
            # Extract column data from request
            columns = request.args.get('columns')
            columns = json.loads(columns)

            # Create a DataFrame to store column data
            column_df = pd.DataFrame(columns=['Column Name', 'Ascending/Descending'])
            column_names = [col['by_value'] for col in columns]
            sorting_orders = [col['sortOrder'].lower() == '1' for col in columns]
            df=df.sort_values(by=column_names,ascending=sorting_orders)
            logs += f"df=df.sort_values({column_names},ascending={sorting_orders})\n"

            return Markup(df.to_html())
        else:
            return jsonify({'error': 'No DataFrame available.'})
    except Exception as e:
        return jsonify({'error': 'Error: ' + str(e)})


@app.route('/show_corr')
def show_corr():
    global df,logs
    method = request.args.get('method')
    try:
        if df is not None:
            if method == 'pearson':
                correlation = df.corr(method='pearson')
                logs += f"df.corr(method='pearson')\n"

            elif method == 'kendall':
                correlation = df.corr(method='kendall')
                logs += f"df.corr(method='kendall')\n"
            elif method == 'spearman':
                correlation = df.corr(method='spearman')
                logs += f"df.corr(method='spearman')\n"
            else:
                return 'Invalid method'

            return Markup(correlation.to_html())
        else:
            return 'No DataFrame available.'
    except Exception as e:
        return 'Error: ' + str(e)

@app.route('/group_by_column')
def group_by_column():
    global df, new_df,logs
    column = request.args.get('column').split(',')
    aggregation = request.args.get('aggregation')

    try:
        if df.empty:
            return 'No DataFrame available.'
        else:
            new_df = df.copy()  # Create a copy of the original DataFrame
            if aggregation == 'max':
                df= new_df.groupby(column).max()
                df.reset_index(inplace=True)
                logs += f"df=df.groupby({column}).max()\ndf.reset_index(inplace=True)\n"
                return df.to_html()
            elif aggregation == 'min':
                df= new_df.groupby(column).min()
                df.reset_index(inplace=True)
                logs += f"df=df.groupby({column}).min()\ndf.reset_index(inplace=True)\n"
                return Markup(df.to_html())
            elif aggregation == 'sum':
                df= new_df.groupby(column).sum()
                df.reset_index(inplace=True)
                logs += f"df=df.groupby({column}).sum()\ndf.reset_index(inplace=True)\n"
                return Markup(df.to_html())
            elif aggregation == 'avg':
                df= new_df.groupby(column).mean()
                df.reset_index(inplace=True)
                logs += f"df=df.groupby({column}).mean()\ndf.reset_index(inplace=True)\n"
                return Markup(df.to_html())
            elif aggregation == 'count':
                df = new_df.groupby(column).size().reset_index(name='count')
                # df = df[df['count'] == df['count'].max()]
                df.columns = column + ['count']
                logs += f"df=df.groupby({column}).size().reset_index(name='count')\ndf.columns={column}+['count']\n"
                return Markup(df.to_html())

            else:
                return 'Invalid Aggregation Method'
    except Exception as e:
        return 'Error: ' + str(e)


#=========================== Data Cleaning Endpoints======================================

@app.route('/show_isna')
def show_isna():
    global df,new_df,logs
    try:
        if df is not None:
            naCount = "{0: 'naCount'}"
            logs += f"df.isna().sum().reset_index().rename(columns={naCount})\n"

            return Markup(df.isna().sum().reset_index().rename(columns={0: 'naCount'}).to_html())

        else:
            return 'No DataFrame available.'
    except ValueError:
        return 'Invalid head value.'

@app.route('/show_fillna')
def show_fillna():
    global df,new_df,logs
    target_column = request.args.get('target_column')  # Get the value of 'target_column'
    target_column_value = request.args.get('target_column_value')  # Get the value of 'target_column_value'
    try:
        if df is not None and target_column in df.columns:
            # Modify the specified column with the filled values
            df[target_column] = df[target_column].fillna(value=target_column_value)
            logs += f"df['{target_column}'] = df['{target_column}'].fillna(value={target_column_value})\n"

            return Markup(df.to_html())
        else:
            return 'No DataFrame available.'
    except Exception as e:
        return 'Error: ' + str(e)


@app.route('/show_ffill')
def show_ffill():
    global df,new_df,logs
    target_column = request.args.get('target_column')  # Get the value of 'target_column'
    # target_column_value = request.args.get('target_column_value')  # Get the value of 'target_column_value'
    try:
        if df is not None and target_column in df.columns:
            # Modify the specified column with the filled values
            df[target_column] = df[target_column].fillna(method='ffill')
            logs += f"df['{target_column}'] = df['{target_column}'].fillna(method='ffill')\n"
            return Markup(df.to_html())
        else:
            return 'No DataFrame available.'
    except Exception as e:
        return 'Error: ' + str(e)


@app.route('/show_bfill')
def show_bfill():
    global df,new_df,logs
    target_column = request.args.get('target_column')  # Get the value of 'target_column'
    # target_column_value = request.args.get('target_column_value')  # Get the value of 'target_column_value'
    try:
        if df is not None and target_column in df.columns:
            # Modify the specified column with the filled values
            df[target_column] = df[target_column].fillna(method='bfill')
            logs += f"df['{target_column}'] = df['{target_column}'].fillna(method='bfill')\n"
            return Markup(df.to_html())
        else:
            return 'No DataFrame available.'
    except Exception as e:
        return 'Error: ' + str(e)


@app.route('/dropna')
def dropna():
    global df,new_df,logs

    criteria = request.args.get('criteria')

    try:
        if df is not None:
            if criteria.startswith('how_row'):
                how_value = request.args.get('how')
                if how_value == 'any':
                    df = df.dropna(how='any')
                    logs += f"df.dropna(how='any')\n"

                elif how_value == 'all':
                    df = df.dropna(how='all')
                    logs += f"df.dropna(how='all')\n"
                else:
                    return 'Invalid how value'

                return Markup(df.to_html())
            elif criteria.startswith('how_col'):
                how_value = request.args.get('how')
                if how_value == 'any':
                    df = df.dropna(axis=1,how='any')
                    logs += f"df.dropna(axis=1,how='any')\n"
                elif how_value == 'all':
                    df = df.dropna(axis=1,how='all')
                    logs += f"df.dropna(axis=1,how='all')\n"
                else:
                    return 'Invalid how value'

                return Markup(df.to_html())

            elif criteria.startswith('thresh_row'):
                thresh_value = request.args.get('thresh')
                if thresh_value:
                    thresh_value = int(thresh_value)  # Assuming the threshold is an integer
                    df = df.dropna(thresh=thresh_value)
                    logs += f"df.dropna(thresh={thresh_value})\n"
                else:
                    return 'Threshold value not provided'

                return Markup(df.to_html())
            elif criteria.startswith('thresh_col'):
                thresh_value = request.args.get('thresh')
                if thresh_value:
                    thresh_value = int(thresh_value)  # Assuming the threshold is an integer
                    df = df.dropna(axis=1,thresh=thresh_value)
                    logs += f"df.dropna(axis=1,thresh={thresh_value})\n"
                else:
                    return 'Threshold value not provided'

                return Markup(df.to_html())
            else:
                return 'Invalid criteria'
        else:
            return 'No DataFrame available.'
    except Exception as e:
        return 'Error: ' + str(e)

@app.route('/drop', methods=['GET'])
def drop():
    global df,logs

    drop_type = request.args.get('drop_type')

    if df is not None:
        try:
            if drop_type == 'row':
                row_numbers = request.args.get('row_numbers').split(',')
                for row_number in row_numbers:
                    if row_number:
                        df.drop(df.index[int(row_number)], inplace=True)
                return Markup(df.to_html())

            elif drop_type == 'column':
                column_names = request.args.get('column_names').split(',')
                df.drop(column_names,axis=1,inplace=True)
                logs += f"df.drop({column_names},axis=1,inplace=True)\n"
                return Markup(df.to_html())

            else:
                return 'Invalid drop type'

        except Exception as e:
            return 'Error: ' + str(e)

    else:
        return 'No DataFrame available'


@app.route('/show_drop_duplicates')
def show_drop_duplicates():
    global df,logs
    parameters = request.args.get('parameters')
    try:
        if df is not None:
            if parameters == 'first':
                df = df.drop_duplicates(keep='first')
                logs += f"df=df.drop_duplicates(keep='first')\n"
            elif parameters == 'last':
                df=df.drop_duplicates(keep='last')
                logs += f"df=df.drop_duplicates(keep='last')\n"
            else:
                return 'Invalid method'

            return Markup(df.to_html())
        else:
            return 'No DataFrame available.'
    except Exception as e:
        return 'Error: ' + str(e)


@app.route('/show_duplicates')
def show_duplicates():
    global df,logs
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
    global df,logs
    try:
        if df is not None:
            df=df.reset_index(drop=True)
            logs += f"df=df.reset_index(drop=True)\n"
            return Markup(df.to_html())
        else:
            return 'No DataFrame available.'
    except pd.errors.EmptyDataError:
        return 'DataFrame is empty.'
    except Exception as e:
        return 'Error: ' + str(e)

@app.route('/logs')
def show_logs():
    return logs


@app.route('/clear_logs')
def show_clear_logs():
    global logs
    lines = logs.split('\n')
    # Keep the first four lines
    logs = '\n'.join(lines[:4])+'\n'
    return logs


#==================================Data Visualization============================================
plt.figure(figsize=(10, 8))
@app.route('/show_bar')
def show_bar():
    global logs
    try:
        row = request.args.get('row')
        col = request.args.get('col')
        color=request.args.get('color')
        colors = ['blue']  # Initialize colors variable
        if color:
            colors = color.split(',')
            plt.bar(df[row], df[col],color=colors)
        else:
            plt.bar(df[row],df[col])
        # Adding labels and title
        plt.ylabel(col)
        plt.xlabel(row)
        if len(df[row])>5:
            plt.xticks(rotation=90)
            logs += f"plt.xticks(rotation=90)\n"
        img_buffer = BytesIO()
        plt.savefig(img_buffer, format='png')
        img_buffer.seek(0)
        img_str = base64.b64encode(img_buffer.read()).decode('utf-8')
        plt.close()

        logs += f"plt.bar(df['{row}'], df['{col}'],color={colors})\nplt.ylabel('{col}')\nplt.xlabel('{row}')\nplt.show()"
        return f'<img src="data:image/png;base64,{img_str}">'

    except Exception as e:
        return f"Error: {str(e)}"


@app.route('/show_scatter')
def show_scatter():
    global logs
    try:
        row = request.args.get('row')
        col = request.args.get('col')
        plt.scatter(df[row], df[col])
        plt.xlabel(row)
        plt.ylabel(col)
        # Adding labels and title
        img_buffer = BytesIO()
        plt.savefig(img_buffer, format='png')
        img_buffer.seek(0)
        img_str = base64.b64encode(img_buffer.read()).decode('utf-8')
        plt.close()
        logs += f"plt.scatter(df['{row}'], df['{col}'])\nplt.ylabel('{col}')\nplt.xlabel('{row}')\nplt.show()"

        return f'<img src="data:image/png;base64,{img_str}">'

    except Exception as e:
        return f"Error: {str(e)}"


@app.route('/show_line')
def show_line():
    global logs
    try:
        row = request.args.get('row')
        col = request.args.get('col')
        plt.plot(df[row], df[col])
        # Adding labels and title
        plt.xlabel(row)
        plt.ylabel(col)
        if len(df[row])>5:
            plt.xticks(rotation=90)
            logs += f"plt.xticks(rotation=90)\n"
        img_buffer = BytesIO()
        plt.savefig(img_buffer, format='png')
        img_buffer.seek(0)
        img_str = base64.b64encode(img_buffer.read()).decode('utf-8')
        plt.close()
        logs += f"plt.plot(df['{row}'], df['{col}'])\nplt.ylabel('{col}')\nplt.xlabel('{row}')\nplt.show()\n"
        return f'<img src="data:image/png;base64,{img_str}">'

    except Exception as e:
        return f"Error: {str(e)}"



@app.route('/show_boxplot')
def show_boxplot():
    global logs
    try:
        df.boxplot()
        if len(df.columns)>5:
            plt.xticks(rotation=90)
            logs += f"plt.xticks(rotation=90)\n"
        img_buffer = BytesIO()
        plt.savefig(img_buffer, format='png')
        img_buffer.seek(0)
        img_str = base64.b64encode(img_buffer.read()).decode('utf-8')
        plt.close()
        logs += f"df.boxplot()\n"
        return f'<img src="data:image/png;base64,{img_str}">'

    except Exception as e:
        return f"Error: {str(e)}"


@app.route('/show_area')
def show_area():
    global logs
    try:
        row = request.args.get('row')
        col = request.args.get('col')
        plt.fill_between(df[row], df[col])

        # Adding labels and title
        plt.xlabel(row)
        plt.ylabel(col)
        if len(df[row])>5:
            plt.xticks(rotation=90)
            logs += f"plt.xticks(rotation=90)\n"
        img_buffer = BytesIO()
        plt.savefig(img_buffer, format='png')
        img_buffer.seek(0)
        img_str = base64.b64encode(img_buffer.read()).decode('utf-8')
        plt.close()
        logs += f"plt.fill_between(df['{row}'], df['{col}'])\nplt.ylabel('{col}')\nplt.xlabel('{row}')\nplt.show()"
        return f'<img src="data:image/png;base64,{img_str}">'

    except Exception as e:
        return f"Error: {str(e)}"


@app.route('/show_violin')
def show_violin():
    global logs
    try:
        plt.violinplot(df, showmeans=False, showmedians=True)
        if len(df.columns)>5:
            plt.xticks(rotation=90)
            logs += f"plt.xticks(rotation=90)\n"
        img_buffer = BytesIO()
        plt.savefig(img_buffer, format='png')
        img_buffer.seek(0)
        img_str = base64.b64encode(img_buffer.read()).decode('utf-8')
        plt.close()
        logs += f"plt.violinplot(df,showmeans=False,showmedians=True)\nplt.show()"
        return f'<img src="data:image/png;base64,{img_str}">'

    except Exception as e:
        return f"Error: {str(e)}"


#======================================Data Output========================================
@app.route('/show_json')
def show_json():
    global logs
    try:
        logs+=f"df.to_json()\n"
        return Markup(df.to_json())
    except Exception as e:
        return f"Error: {str(e)}"

@app.route('/show_xml')
def show_xml():
    global logs
    try:
        logs+=f"df.to_xml()\n"
        return Markup(df.to_xml())
    except Exception as e:
        return f"Error: {str(e)}"


@app.route('/show_parquet')
def show_parquet():
    global logs
    try:
        logs += f"df.to_parquet()\n"
        return Markup(df.to_parquet())
    except Exception as e:
        return f"Error: {str(e)}"

@app.route('/show_latex')
def show_clipboard():
    global logs
    try:
        logs += f"df.to_latex()\n"
        return Markup(df.to_latex())
    except Exception as e:
        return f"Error: {str(e)}"

@app.route('/show_tsv')
def show_tsv():
    global logs
    try:
        logs += f"df.to_csv(sep='\\t')\n"
        return Markup(df.to_csv(sep="\t"))
    except Exception as e:
        return f"Error: {str(e)}"

# =========================================Data Manipulation================================================
@app.route('/show_rename')
def show_rename():
    global df,new_df,logs
    old=request.args.get('old')  # Get the value of 'target_column'
    new=request.args.get('new')
    try:
        if df is not None:
            old_list = old.split(',')
            new_list = new.split(',')
            if len(old_list) != len(new_list):
                return 'Error: Number of old and new values must match.'

                # Check if all old columns exist in the DataFrame
            if all(old_col in df.columns for old_col in old_list):
                # Rename the specified columns with the new values
                rename_dict = dict(zip(old_list, new_list))
                df.rename(columns=rename_dict, inplace=True)

                return Markup(df.to_html())
            else:
                return 'Error: One or more old columns do not exist'
        else:
            return 'No DataFrame available.'
    except Exception as e:
        return 'Error: ' + str(e)

@app.route('/show_astype')
def show_astype():
    global df,logs
    col = request.args.get('col').split(',')
    dtype = request.args.get('dtype')

    try:
        if df is not None:
            for c in col:
                if c in df.columns:
                    df[col] = df[col].astype(dtype, errors='raise')
                    logs+=f"for cols in df.columns:\n\tdf[{col}]=df[{col}].astype(dtype,errora='raise')\n"
                else:
                    return f'Error: Column "{c}" not found in the DataFrame.'
            # Attempt to convert the column to the specified data type

            return Markup(df.to_html())
        else:
            return 'No DataFrame available or specified column not found.'
    except ValueError as ve:
        return f'Error: {ve}. Unable to convert column "{col}" to data type "{dtype}".'
    except Exception as e:
        return f'Error: {e}'


@app.route('/show_set_index')
def show_set_index():
    global df,logs
    col = request.args.get('col').split(',')

    try:
        if df is not None:
            df.set_index(col,inplace=True)
            logs += f"df.set_index({col},inplace=True)\n"
            return Markup(df.to_html())
        else:
            return 'No DataFrame available or specified column not found.'
    except ValueError as ve:
        return f'Error: {ve}. Unable to set column "{col}" index.'
    except Exception as e:
        return f'Error: {e}'

@app.route('/show_concat', methods=['GET'])
def show_concat():
    global df,logs
    col_names = request.args.get('col').split(',')
    agg_val=request.args.get('agg_val')
    try:
        # Concatenate specified columns
        df['concatenated'] = df[col_names].astype(str).agg(agg_val.join, axis=1)
        logs += f"df['concatenated'] = df[{col_names}].astype(str).agg('{agg_val}'.join, axis=1)\n"
        return df.to_html()
    except Exception as e:
        return str(e)

@app.route('/show_split')
def show_split():
    global df,logs
    col = request.args.get('col')
    val = request.args.get('val')

    max_parts = max(len(part.split(val)) for part in df[col])
    split_result = df[col].str.split(val, expand=True, n=max_parts)

    # Rename the columns
    new_columns = [f'{col}_part{i + 1}' for i in range(max_parts)]
    df[new_columns] = split_result

    return df.to_html()



@app.route('/show_remove_index')
def show_remove_index():
    global df,logs
    return df.to_html(index=False)

@app.route('/show_where')
def show_where():
    global df,logs
    col = request.args.get('col')
    operator = request.args.get('operator')
    print(operator)
    type = request.args.get('type')
    print(type)
    if type == 'int':
        val = int(request.args.get('val'))
        if operator == 'equal':
            df = df[df[col] == val]
            logs +=f"df[df['{col}'] == {val}]\n"

        elif operator == 'greater_than':
            df = df[(df[col] > val)]
            logs += f"df[df['{col}'] > {val}]\n"
        elif operator =='greater_equal_than':
            df = df[(df[col] >= val)]
            logs += f"df[df['{col}'] >= {val}]\n"
        elif operator == 'less_equal_than':
            df = df[(df[col] <= val)]
            logs += f"df[df['{col}'] <= {val}]\n"
        elif operator == 'less_than':
            df = df[(df[col] < val)]
            logs += f"df[df['{col}'] < {val}]\n"
    elif type == 'str':
        val = request.args.get('val')
        if operator == 'equal':
            df = df[(df[col] == val)]
            logs += f"df[df['{col}'] == {val}]\n"
        elif operator =='Contain':
            df = df[df[col].str.contains(val, case=False, regex=True)]
            logs += f"df[df['{col}'].str.contains('{val}', case=False, regex=True)]\n"
        elif operator == 'equal':
            df = df[(df[col] == val)]
            logs+=f"df[df['{col}']=={val}]"

    elif type == 'float':
        val = float(request.args.get('val'))
        if operator == 'equal':
            df = df[df[col] == val]
            logs += f"df[df['{col}'] == {val}]\n"
        elif operator == 'greater_than':
            df = df[(df[col] > val)]
            logs += f"df[df['{col}'] > {val}]\n"
        elif operator == 'greater_equal_than':
            df = df[(df[col] >= val)]
            logs += f"df[df['{col}'] >= {val}]\n"
        elif operator == 'less_equal_than':
            df = df[(df[col] <= val)]
            logs += f"df[df['{col}'] <= {val}]\n"
        elif operator == 'less_than':
            df = df[(df[col] < val)]
            logs += f"df[df['{col}'] < {val}]\n"
    elif type == 'bool':
        val = bool(request.args.get('val'))
        if operator == 'equal':
            df = df[df[col] == val]
            logs += f"df[df['{col}'] == {val}]\n"

    return df.to_html()

if __name__ == '__main__':
    app.run(debug=True)
