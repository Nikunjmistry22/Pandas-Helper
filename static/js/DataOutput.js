$(document).ready(function () {
    $('.toggle').hide();
    $('#func_json').on('click', function () {
        $('#tagLine').hide();
        $('#logging').hide();
        $('#dataOutputModal').modal('hide');
    });
    $('#func_xml').on('click', function () {

        $('#tagLine').hide();
        $('#logging').hide();
        $('#dataOutputModal').modal('hide');
    });
    $('#func_parquet').on('click', function () {

        $('#tagLine').hide();
        $('#logging').hide();
        $('#dataOutputModal').modal('hide');
    });
    $('#func_latex').on('click', function () {

        $('#tagLine').hide();
        $('#logging').hide();
        $('#dataOutputModal').modal('hide');
    });
    $('#func_tsv').on('click', function () {

        $('#tagLine').hide();
        $('#logging').hide();
        $('#dataOutputModal').modal('hide');
    });
});


document.getElementById('func_json').addEventListener('click', function() {
       const url = `/show_json`;
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
        alert('Error!',error.message);
    });
});


document.getElementById('func_xml').addEventListener('click', function() {
       const url = `/show_xml`;
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


document.getElementById('func_parquet').addEventListener('click', function() {
       const url = `/show_parquet`;
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
        alert('Error!',error.message);
    });
});


document.getElementById('func_latex').addEventListener('click', function() {
       const url = `/show_latex`;
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.text(); // Ensure the response is treated as text
        } else {
            throw new Error('Failed to fetch DataFrame head.');
        }
    })
    .then(data => {
        document.getElementById('fileDisplayArea').innerHTML = data
        // Display the DataFrame head data as needed
    })
    .catch(error => {
        console.error('DataFrame head fetch error:', error.message);
        alert('Error!',error.message);
    });
});


document.getElementById('func_tsv').addEventListener('click', function() {
       const url = `/show_tsv`;
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.text(); // Ensure the response is treated as text
        } else {
            throw new Error('Failed to fetch DataFrame head.');
        }
    })
    .then(data => {
        const tabSeparatedData = data.replace(/ /g, '\t');

            document.getElementById('fileDisplayArea').innerHTML = tabSeparatedData;
        // Display the DataFrame head data as needed
    })
    .catch(error => {
        console.error('DataFrame head fetch error:', error.message);
        alert('Error!',error.message);
    });
});

