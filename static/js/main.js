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
