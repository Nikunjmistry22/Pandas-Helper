
    $(document).ready(function () {
        $('.toggle').hide();
         $('#func_show_original').on('click', function () {
            $('.toggle').hide();
            $('#tagLine').hide();
            $('#logging').hide();
            $('#show_original_main').toggle();
            $('#dataViewModal').modal('hide');
        });
        $('#func_show').on('click', function () {
            $('.toggle').hide();$('#tagLine').hide();
            $('#logging').hide();
            $('#show_main').toggle();
            $('#dataViewModal').modal('hide');
        });
        $('#func_head').on('click', function () {
            $('.toggle').hide();$('#tagLine').hide();
            $('#logging').hide();
            $('#head_main').toggle();
            $('#dataViewModal').modal('hide');
        });
        $('#func_tail').on('click', function () {
            $('.toggle').hide();$('#tagLine').hide();
            $('#logging').hide();
            $('#tail_main').toggle();
            $('#dataViewModal').modal('hide');
        });
        $('#func_info').on('click', function () {
            $('.toggle').hide();$('#logging').hide();
            $('#tagLine').hide();
            $('#info_main').toggle();
            $('#dataViewModal').modal('hide');

        });
        $('#func_describe').on('click', function () {
            $('.toggle').hide();$('#logging').hide();
            $('#tagLine').hide();
            $('#describe_main').toggle();
            $('#dataViewModal').modal('hide');
        });

        $('#func_shape').on('click', function () {
            $('.toggle').hide();$('#logging').hide();
            $('#tagLine').hide();
            $('#shape_main').toggle();
            $('#dataViewModal').modal('hide');
        });

        $('#func_columns').on('click', function () {
            $('.toggle').hide();$('#logging').hide();
            $('#tagLine').hide();
            $('#columns_main').toggle();
            $('#dataViewModal').modal('hide');
        });

        $('#func_sort_values').on('click', function () {
            $('.toggle').hide();$('#logging').hide();
            $('#tagLine').hide();
            $('#sort_values_main').toggle();
            $('#dataViewModal').modal('hide');
        });

        $('#func_corr').on('click', function () {
            $('.toggle').hide();$('#logging').hide();
            $('#tagLine').hide();
            $('#corr_main').toggle();
            $('#dataViewModal').modal('hide');
        });
         $('#func_groupby').on('click', function () {
                    $('.toggle').hide();$('#logging').hide();
                    $('#tagLine').hide();
                    $('#groupby_main').toggle();
                    $('#dataViewModal').modal('hide');
                });
        $('#func_dtypes').on('click', function () {
                    $('.toggle').hide();$('#logging').hide();
                    $('#tagLine').hide();
                    $('#dtypes_main').toggle();
                    $('#dataViewModal').modal('hide');
                });
    });


document.getElementById('show_original_button').addEventListener('click', function() {
    const url = '/show_original'
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.text();  // Ensure the response is treated as text
        } else {
            throw new Error('Failed to fetch DataFrame head.');
        }
    })
    .then(data => {
        document.getElementById('fileDisplayArea').innerHTML = data;
        // Display the DataFrame head data as needed
    })
    .catch(error => {
        console.error('DataFrame head fetch error:', error.message);
        alert('Error!!! DataFrame head fetch error');
    });
});

document.getElementById('show_button').addEventListener('click', function() {
    const columns_values = document.getElementById('columns_name').value;
    const url = `/show?column_values=${columns_values}`;
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.text();  // Ensure the response is treated as text
            } else {
                throw new Error('Failed to fetch DataFrame.');
            }
        })
        .then(data => {
            document.getElementById('fileDisplayArea').innerHTML = data;
            // Display the DataFrame data as needed
        })
        .catch(error => {
            console.error('DataFrame fetch error:', error.message);
            alert('Error fetching DataFrame');
        });
});

document.getElementById('head_button').addEventListener('click', function() {
       const headValue = document.getElementById('head_value').value; // Get the value from the input box
    const url = '/show_head?head_value=' + headValue;
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.text();  // Ensure the response is treated as text
        } else {
            throw new Error('Failed to fetch DataFrame head.');
        }
    })
    .then(data => {
        document.getElementById('fileDisplayArea').innerHTML = data;
        // Display the DataFrame head data as needed
    })
    .catch(error => {
        console.error('DataFrame head fetch error:', error.message);
        alert('Error!!! DataFrame head fetch error');
    });
});


document.getElementById('tail_button').addEventListener('click', function() {
       const tailValue = document.getElementById('tail_value').value; // Get the value from the input box
    const url = '/show_tail?tail_value=' + tailValue;
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.text();  // Ensure the response is treated as text
        } else {
            throw new Error('Failed to fetch DataFrame head.');
        }
    })
    .then(data => {
        document.getElementById('fileDisplayArea').innerHTML = data;
        // Display the DataFrame head data as needed
    })
    .catch(error => {
        console.error('DataFrame head fetch error:', error.message);
        alert('Error!!! DataFrame head fetch error');
    });
});


document.getElementById('info_button').addEventListener('click', function() {

    const url = '/show_info'
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.text();  // Ensure the response is treated as text
        } else {
            throw new Error('Failed to fetch DataFrame head.');
        }
    })
    .then(data => {
        const formattedData = data.replace(/\n/g, '<br>');
        document.getElementById('fileDisplayArea').innerHTML = formattedData;
        // Display the DataFrame head data as needed
    })
    .catch(error => {
        console.error('DataFrame head fetch error:', error.message);
        alert('Error!!! DataFrame head fetch error');
    });
});

document.getElementById('dtypes_button').addEventListener('click', function() {

    const url = '/show_dtypes'
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.text();  // Ensure the response is treated as text
        } else {
            throw new Error('Failed to fetch DataFrame head.');
        }
    })
    .then(data => {
        const formattedData = data.replace(/\n/g, '<br>');
        document.getElementById('fileDisplayArea').innerHTML = formattedData;
        // Display the DataFrame head data as needed
    })
    .catch(error => {
        console.error('DataFrame head fetch error:', error.message);
        alert('Error!!! DataFrame head fetch error');
    });
});

document.getElementById('describe_button').addEventListener('click', function() {

    const url = '/show_describe'
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.text();  // Ensure the response is treated as text
        } else {
            throw new Error('Failed to fetch DataFrame head.');
        }
    })
    .then(data => {
        document.getElementById('fileDisplayArea').innerHTML = data;
        // Display the DataFrame head data as needed
    })
    .catch(error => {
        console.error('DataFrame head fetch error:', error.message);
        alert('Error!!! DataFrame head fetch error');
    });
});


document.getElementById('shape_button').addEventListener('click', function() {

    const url = '/show_shape'
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.text();  // Ensure the response is treated as text
        } else {
            throw new Error('Failed to fetch DataFrame head.');
        }
    })
    .then(data => {
        document.getElementById('fileDisplayArea').innerHTML = data;
        // Display the DataFrame head data as needed
    })
    .catch(error => {
        console.error('DataFrame head fetch error:', error.message);
        alert('Error!!! DataFrame head fetch error');
    });
});

document.getElementById('columns_button').addEventListener('click', function() {

    const url = '/show_columns'
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.text();  // Ensure the response is treated as text
        } else {
            throw new Error('Failed to fetch DataFrame head.');
        }
    })
    .then(data => {
        document.getElementById('fileDisplayArea').innerHTML = data;
        // Display the DataFrame head data as needed
    })
    .catch(error => {
        console.error('DataFrame head fetch error:', error.message);
        alert('Error!!! DataFrame head fetch error');
    });
});


document.getElementById('corr_button').addEventListener('click', function() {
    const method = document.getElementById('correlationMethod').value;
    const url = `/show_corr?method=${method}`;
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.text();  // Ensure the response is treated as text
        } else {
            throw new Error('Failed to fetch DataFrame head.');
        }
    })
    .then(data => {
        document.getElementById('fileDisplayArea').innerHTML = data;
        // Display the DataFrame head data as needed
    })
    .catch(error => {
        console.error('DataFrame head fetch error:', error.message);
        alert('Error!!! DataFrame head fetch error');
    });
});

document.getElementById('groupBy_button').addEventListener('click', function() {
     const column = document.getElementById('groupByColumn').value;
        const aggregation = document.getElementById('aggregationDropdown').value;
        const url = `/group_by_column?column=${column}&aggregation=${aggregation}`;


    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.text(); // Ensure the response is treated as text
            } else {
                throw new Error('Failed to fetch sort values.');
            }
        })
        .then(data => {
            document.getElementById('fileDisplayArea').innerHTML = data;
            // Display the DataFrame head data as needed
        })
        .catch(error => {
            console.error('Sort values fetch error:', error.message);
            alert('Error!!! Sort values fetch error');
        });
});

document.addEventListener('DOMContentLoaded', function () {
    const sortValuesMainDiv = document.getElementById('sort_values_main');
    const columnsContainer = document.getElementById('columns-container');

    document.getElementById('add_sort_value').addEventListener('click', function () {
        // Create a new container for each added column
        const columnContainer = document.createElement('div');
        columnContainer.classList.add('column-container');

        // Create a new input element for column name
        const columnNameInput = document.createElement('input');
        columnNameInput.classList.add('column-input');
        columnNameInput.setAttribute('placeholder', 'Enter the column name');

        // Create a new select element for ascending/descending
        const sortOrderSelect = document.createElement('select');
        sortOrderSelect.classList.add('column-dropdown');
        const ascendingOption = document.createElement('option');
        ascendingOption.setAttribute('value', '1');
        ascendingOption.textContent = 'Ascending';
        const descendingOption = document.createElement('option');
        descendingOption.setAttribute('value', '0');
        descendingOption.textContent = 'Descending';
        sortOrderSelect.appendChild(ascendingOption);
        sortOrderSelect.appendChild(descendingOption);
        sortOrderSelect.style.marginRight = '10px';
        const deleteButton = document.createElement('i');
        deleteButton.style.cursor = 'pointer';
        deleteButton.classList.add('fa', 'fa-minus', 'delete-button');
        deleteButton.addEventListener('click', function () {
            // Remove the column container when the delete button is clicked
            columnsContainer.removeChild(columnContainer);
        });
        // Append the new input and select elements to the column container
        columnContainer.appendChild(columnNameInput);
        columnContainer.appendChild(sortOrderSelect);
         columnContainer.appendChild(deleteButton);
        // Append the new column container to the columns container
        columnsContainer.appendChild(columnContainer);
    });

    document.getElementById('sort_values_button').addEventListener('click', function () {
        const columnContainers = document.querySelectorAll('.column-container');

        // Extract values from added columns
        const columnData = Array.from(columnContainers).map(container => ({
            by_value: container.querySelector('.column-input').value,
            sortOrder: container.querySelector('.column-dropdown').value,
        }));

        const url = '/show_sort_values?columns=' + JSON.stringify(columnData);

        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.text(); // Ensure the response is treated as text
                } else {
                    throw new Error('Failed to fetch sort values.');
                }
            })
            .then(data => {
                document.getElementById('fileDisplayArea').innerHTML = data;
                // Display the DataFrame head data as needed
            })
            .catch(error => {
                console.error('Sort values fetch error:', error.message);
                alert('Error!!! Sort values fetch error');
            });
    });
});
