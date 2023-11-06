
    $(document).ready(function () {
        $('.toggle').hide();
        $('#func_isna').on('click', function () {
            $('.toggle').hide();
            $('#isna_main').toggle();
            $('#dataCleaningModal').modal('hide');
        });
        $('#func_fillna').on('click', function () {
            $('.toggle').hide();
            $('#fillna_main').toggle();
            $('#dataCleaningModal').modal('hide');
        });
        $('#func_ffill').on('click', function () {
            $('.toggle').hide();
            $('#ffill_main').toggle();
            $('#dataCleaningModal').modal('hide');
        });
        $('#func_bfill').on('click', function () {
            $('.toggle').hide();
            $('#bfill_main').toggle();
            $('#dataCleaningModal').modal('hide');
        });
        $('#func_dropna').on('click', function () {
            $('.toggle').hide();
            $('#dropna_main').toggle();
            $('#dataCleaningModal').modal('hide');
        });
    });



document.getElementById('isna_button').addEventListener('click', function() {

    const url = '/show_isna'
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

document.getElementById('fillna_button').addEventListener('click', function() {
       const targetColumn = document.getElementById('target_column').value; // Get the value from the input box
       const targetColumnVal = document.getElementById('target_column_value').value; // Get the value from the input box
    const url = '/show_fillna?target_column=' + (targetColumn) + '&target_column_value=' + (targetColumnVal);
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


document.getElementById('ffill_button').addEventListener('click', function() {
       const targetColumn = document.getElementById('f_target_column').value; // Get the value from the input box
//       const targetColumnVal = document.getElementById('f_target_column_value').value; // Get the value from the input box
    const url = '/show_ffill?target_column=' + (targetColumn)
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


document.getElementById('bfill_button').addEventListener('click', function() {
       const targetColumn = document.getElementById('b_target_column').value; // Get the value from the input box
//       const targetColumnVal = document.getElementById('b_target_column_value').value; // Get the value from the input box
    const url = '/show_bfill?target_column=' + (targetColumn)
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
// Function to handle the dropna action based on the selected criteria
function performDropna() {
    const criteria = document.getElementById('dropna_criteria').value;

    if (criteria.startsWith('how')) {
        const howValue = document.getElementById('dropna_how').value;
        // Perform dropna based on 'how' criteria for rows or columns
        console.log(`Dropping based on ${criteria} with ${howValue}`);
    } else if (criteria.startsWith('thresh')) {
        const threshValue = document.getElementById('dropna_thresh').value;
        // Perform dropna based on 'thresh' criteria for rows or columns
        console.log(`Dropping based on ${criteria} with ${threshValue}`);
    }
}

// Function to show options based on selected criteria
function toggleOptions() {
    const criteria = document.getElementById('dropna_criteria').value;

    if (criteria.startsWith('how')) {
        document.getElementById('how_options').style.display = 'block';
        document.getElementById('thresh_options').style.display = 'none';
    } else if (criteria.startsWith('thresh')) {
        document.getElementById('how_options').style.display = 'none';
        document.getElementById('thresh_options').style.display = 'block';
    }
}

// Show options based on default selected criteria on page load
window.onload = function() {
    toggleOptions(); // Show both sets of options
}

// Event listeners for dropdown change and button click
document.getElementById('dropna_criteria').addEventListener('change', toggleOptions);
document.getElementById('dropna_button').addEventListener('click', performDropna);

document.getElementById('dropna_button').addEventListener('click', function() {
    const criteria = document.getElementById('dropna_criteria').value;

    if (criteria.startsWith('how')) {
        const howValue = document.getElementById('dropna_how').value;
        const url = '/dropna?criteria=' + criteria + '&how=' + howValue;
        performDropnaFetch(url);
    } else if (criteria.startsWith('thresh')) {
        const threshValue = document.getElementById('dropna_thresh').value;
        const url = '/dropna?criteria=' + criteria + '&thresh=' + threshValue;
        performDropnaFetch(url);
    }
});

// Function to perform the actual fetch operation
function performDropnaFetch(url) {
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.text();  // Ensure the response is treated as text
        } else {
            throw new Error('Failed to fetch DataFrame dropna.');
        }
    })
    .then(data => {
        document.getElementById('fileDisplayArea').innerHTML = data;
        // Display the DataFrame dropna data as needed
    })
    .catch(error => {
        console.error('DataFrame dropna fetch error:', error.message);
        alert('Error!!! DataFrame dropna fetch error');
    });
}
