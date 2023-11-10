$(document).ready(function () {
        $('.toggle').hide();
         $('#func_bar').on('click', function () {
            $('.toggle').hide();
            $('#tagLine').hide();
            $('#logging').hide();
            $('#bar_main').toggle();
            $('#dataVisualizationModal').modal('hide');
        });

        $('#func_scatter').on('click', function () {
            $('.toggle').hide();
            $('#tagLine').hide();
            $('#logging').hide();
            $('#scatter_main').toggle();
            $('#dataVisualizationModal').modal('hide');
        });
        $('#func_line').on('click', function () {
            $('.toggle').hide();
            $('#tagLine').hide();
            $('#logging').hide();
            $('#line_main').toggle();
            $('#dataVisualizationModal').modal('hide');
        });
        $('#func_boxplot').on('click', function () {
            $('.toggle').hide();
            $('#tagLine').hide();
            $('#logging').hide();
            $('#boxplot_main').toggle();
            $('#dataVisualizationModal').modal('hide');
        });
        $('#func_pie').on('click', function () {
            $('.toggle').hide();
            $('#tagLine').hide();
            $('#logging').hide();
            $('#pie_main').toggle();
            $('#dataVisualizationModal').modal('hide');
        });
});


document.getElementById('bar_button').addEventListener('click', function() {
       const row = document.getElementById('bar_row_value').value; // Get the value from the input box
       const col = document.getElementById('bar_col_value').value; // Get the value from the input box
       const color = document.getElementById('bar_color_input').value; // Get the value from the input box
       const url = `/show_bar?row=${row}&col=${col}&color=${color}`;
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


document.getElementById('scatter_button').addEventListener('click', function() {
       const row = document.getElementById('scatter_row_value').value; // Get the value from the input box
       const col = document.getElementById('scatter_col_value').value; // Get the value from the input box
       const url = `/show_scatter?row=${row}&col=${col}`;
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


document.getElementById('line_button').addEventListener('click', function() {
       const row = document.getElementById('line_row_value').value; // Get the value from the input box
       const col = document.getElementById('line_col_value').value; // Get the value from the input box
       const url = `/show_line?row=${row}&col=${col}`;
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
        alert('Error!',error.message);
    });
});


document.getElementById('boxplot_button').addEventListener('click', function() {
     const row = document.getElementById('boxplot_row_value').value; // Get the value from the input box
       const col = document.getElementById('boxplot_col_value').value; // Get the value from the input box
       const url = `/show_boxplot?row=${row}&col=${col}`;
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
        alert('Error!',error.message);
    });
});

