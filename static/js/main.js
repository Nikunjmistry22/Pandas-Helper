 function refreshPage() {
            location.reload(); // Reloads the current page
        }
document.getElementById('fileInput').addEventListener('change', function() {
    const file = this.files[0];
    const fileDisplayArea = document.getElementById('fileDisplayArea');

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const contents = e.target.result;
            const fileType = file.type;

            if (fileType === 'text/csv' || fileType === 'application/vnd.ms-excel') {
                const lines = contents.split('\n');
                let table = '<table>';

                for (let line of lines) {
                    table += '<tr>';

                    const cells = line.split(',');
                    for (let cell of cells) {
                        table += `<td>${cell}</td>`;
                    }

                    table += '</tr>';
                }

                table += '</table>';

                fileDisplayArea.innerHTML = table;
            } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                // Excel file - .xlsx
                const workbook = XLSX.read(contents, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

                const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

                let excelTable = '<table>';
                excelData.forEach(function(row) {
                    excelTable += '<tr>';
                    row.forEach(function(cell) {
                        excelTable += `<td>${cell}</td>`;
                    });
                    excelTable += '</tr>';
                });
                excelTable += '</table>';

                fileDisplayArea.innerHTML = excelTable;
            } else {
                fileDisplayArea.innerHTML = '<p>Uploaded file is not a CSV or Excel file.</p>';
            }
        };

        reader.readAsBinaryString(file);
    } else {
        fileDisplayArea.innerHTML = "<p>No file selected.</p>";
    }
});


document.getElementById('openTableInNewTab').addEventListener('click', function() {
    const tableContent = document.getElementById('fileDisplayArea').innerHTML;
    if (tableContent === "<p>No file selected.</p>" || tableContent === '<p>Uploaded file is not a CSV or Excel file.</p>') {
        alert("No content to display!");
    } else {
        // Open content in a new tab
        const newWindow = window.open();
        newWindow.document.write(tableContent);
    }
});

// Assuming you have a function to load and display the file in a table
function loadFile() {
    // Show loading text when file is being processed
    document.getElementById('loadingText').innerText = 'Loading... Please wait.';

    // Perform the file processing here, for example:
    // This is where you'd handle the logic to display the file in a table

    // For demonstration, I'm adding a setTimeout to simulate a delay in processing the file
    setTimeout(function() {
        // Assuming your file content is stored in a variable called 'fileContent'
        // Replace this with your logic to display the file in a table

        // Example: Displaying the content after a delay (simulated with setTimeout)
        document.getElementById('loadingText').innerText = 'File loaded! Displaying content...';
        // Example: Displaying file content in a table (replace this with your actual logic)
        document.getElementById('loadingText').innerHTML = '<table>... Your file content in table format ...</table>';
    }, 2000); // Simulating a 2-second delay for demonstration, replace with your actual logic
}


 $(document).ready(function() {
            // Show Data Output Modal on hover
            $('#dataOutput').hover(function() {
                $('#dataOutputModal').modal('show');
            }, function() {
                $('#dataOutputModal').modal('hide');
            });

            // Show Data Manipulation Modal on hover
            $('#dataManipulation').hover(function() {
                $('#dataManipulationModal').modal('show');
            }, function() {
                $('#dataManipulation').modal('hide');
            });
            // Show Data View Modal on hover
            $('#dataView').hover(function() {
                $('#dataViewModal').modal('show');
            }, function() {
                $('#dataViewModal').modal('hide');
            });

            // Show Data Cleaning Modal on hover
            $('#dataCleaning').hover(function() {
                $('#dataCleaningModal').modal('show');
            }, function() {
                $('#dataCleaningModal').modal('hide');
            });

            // Show Data Visualizaton Modal on hover
            $('#Visualization').hover(function() {
                $('#dataVisualizationModal').modal('show');
            }, function() {
                $('#dataVisualizationModal').modal('hide');
            });
            $('#aggregation').hover(function(){
            $('#dataAggregationModel').modal('show');
            },function(){
                $('dataAggregationModel').modal('hide');
            });
        });



document.getElementById('uploadFile').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('file', file);

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error('File upload failed');
        })
        .then(data => {
            console.log(data); // Handle successful upload
            alert('File uploaded successfully');
        })
        .catch(error => {
            console.error('Error:', error); // Handle upload failure
            alert('File upload failed');
        });
    } else {
        alert('Please select a file to upload.');
    }
});

$(document).ready(function () {
        $('.toggle').hide();
       $('#logging').hide();
       $('#downloads').hide();
         $('#Logs').on('click', function () {
            $('.toggle').hide();$('#tagLine').hide();
            $('#logging').toggle();
            $('#downloads').hide();

        });


  });


document.getElementById('show_logs_button').addEventListener('click', function() {
    const url = `/logs`;
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.text();  // Ensure the response is treated as text
        } else {
            throw new Error('Failed to fetch DataFrame head.');
        }
    })
    .then(data => {
        document.getElementById('logsTextArea').innerHTML = data;
        // Display the DataFrame head data as needed
    })
    .catch(error => {
        console.error('DataFrame head fetch error:', error.message);
        alert('Error: ',error.message);
    });
});


document.getElementById('clear_logs_button').addEventListener('click', function() {
    const url = `/clear_logs`;
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.text();  // Ensure the response is treated as text
        } else {
            throw new Error('Failed to fetch DataFrame head.');
        }
    })
    .then(data => {
        document.getElementById('logsTextArea').innerHTML = data;
        // Display the DataFrame head data as needed
    })
    .catch(error => {
        console.error('DataFrame head fetch error:', error.message);
        alert('Error: ',error.message);
    });
});

$(document).ready(function () {
    // Show the modal on page load
    $('#dataModal').modal({
        backdrop: 'static',  // Disable closing on clicking outside the modal
        keyboard: false  // Disable closing with the keyboard 'esc' key
    });

    // Center the modal when it is shown
    $('#dataModal').on('shown.bs.modal', function () {
        centerModal();
    });
    var c;
    // Function to center the modal vertically
    function centerModal() {
        var modal = $('#dataModal');
        var modalDialog = modal.find('.modal-dialog');
        var modalHeight = modalDialog.height();
        var topMargin = ($(window).height() - modalHeight) / 2;
        modalDialog.css('margin-top', topMargin + 'px');
    }

    // Function to generate a random code
    function generateCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';

        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters.charAt(randomIndex);
        }
        return code;
    }

    // Function to update the image source with the generated code
    function updateImageSource() {
        c=generateCode();
        var imageUrl = 'https://placehold.it/200x100?text=' + c;
        $('#autoGeneratedCodeImage').attr('src', imageUrl);
    }

    // Function to generate and display the code
    function generateAndDisplayCode() {
        var generatedCode =c;
//        var g2=c;

        var inputCode = $('#codeReader').val().trim();
        console.log('Generated Code:', generatedCode);
//        console.log(g2);
        console.log('Input Code:', inputCode);

        if (inputCode.toLowerCase() === generatedCode.toLowerCase()) {
            console.log('Correct code entered. Hiding modal.');
            $('#dataModal').modal('hide');
        } else {
            console.log('Incorrect code entered. Updating image source.');
            updateImageSource();
        }
    }

    // Attach the function to the button click event
    $('#generateCodeBtn').click(generateAndDisplayCode);
    $('#redo_button').click(generateAndDisplayCode);


    // Call the function initially
    updateImageSource();
});

document.getElementById("copy_logs_button").addEventListener("click", function() {
        var logsTextArea = document.getElementById("logsTextArea");

        // Create a temporary textarea element, set its value, and append it to the document
        var tempTextarea = document.createElement("textarea");
        tempTextarea.value = logsTextArea.value;
        document.body.appendChild(tempTextarea);

        // Select and copy the content of the temporary textarea to the clipboard
        tempTextarea.select();
        document.execCommand("copy");

        // Remove the temporary textarea from the document
        document.body.removeChild(tempTextarea);

        // Display an alert to indicate that the logs are copied
        alert("Logs copied to clipboard");
    });