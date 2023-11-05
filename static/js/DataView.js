
    $(document).ready(function () {
        $('.toggle').hide();
        $('#func_head').on('click', function () {
            $('.toggle').hide();
            $('#head_main').toggle();
            $('#dataViewModal').modal('hide');
        });
        $('#func_tail').on('click', function () {
            $('.toggle').hide();
            $('#tail_main').toggle();
            $('#dataViewModal').modal('hide');
        });
        $('#func_info').on('click', function () {
            $('.toggle').hide();
            $('#info_main').toggle();
            $('#dataViewModal').modal('hide');

        });
        $('#func_describe').on('click', function () {
            $('.toggle').hide();
            $('#describe_main').toggle();
            $('#dataViewModal').modal('hide');
        });

        $('#func_shape').on('click', function () {
            $('.toggle').hide();
            $('#shape_main').toggle();
            $('#dataViewModal').modal('hide');
        });

        $('#func_columns').on('click', function () {
            $('.toggle').hide();
            $('#columns_main').toggle();
            $('#dataViewModal').modal('hide');
        });

        $('#func_sort_values').on('click', function () {
            $('.toggle').hide();
            $('#sort_values_main').toggle();
            $('#dataViewModal').modal('hide');
        });

        $('#func_corr').on('click', function () {
            $('.toggle').hide();
            $('#corr_main').toggle();
            $('#dataViewModal').modal('hide');
        });
         $('#func_groupby').on('click', function () {
                    $('.toggle').hide();
                    $('#groupby_main').toggle();
                    $('#dataViewModal').modal('hide');
                });
        $('#func_dtypes').on('click', function () {
                    $('.toggle').hide();
                    $('#dtypes_main').toggle();
                    $('#dataViewModal').modal('hide');
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

document.getElementById('sort_values_button').addEventListener('click', function() {
    const by_value = document.getElementById('by_value').value; // Get the value from the input box
    const sortOrder = document.getElementById('sortOrderDropdown').value; // Get the selected sort order

    // Convert the sortOrder value to a Boolean
    const ascendingOrder = sortOrder === "1"; // If sortOrder is "1", it means ascending, otherwise descending

    const url = '/show_sort_values?by_value=' + by_value + '&sortOrder=' + ascendingOrder;

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
