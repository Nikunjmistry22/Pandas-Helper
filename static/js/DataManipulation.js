$(document).ready(function () {
        $('.toggle').hide();
         $('#func_rename').on('click', function () {
            $('.toggle').hide();
            $('#tagLine').hide();
            $('#logging').hide();
            $('#rename_main').toggle();
            $('#dataManipulationModal').modal('hide');
        });
         $('#func_astype').on('click', function () {
            $('.toggle').hide();
            $('#tagLine').hide();
            $('#logging').hide();
            $('#astype_main').toggle();
            $('#dataManipulationModal').modal('hide');
        });
        $('#func_set_index').on('click', function () {
            $('.toggle').hide();
            $('#tagLine').hide();
            $('#logging').hide();
            $('#set_index_main').toggle();
            $('#dataManipulationModal').modal('hide');
        });
        $('#func_concat').on('click', function () {
            $('.toggle').hide();
            $('#tagLine').hide();
            $('#logging').hide();
            $('#concat_main').toggle();
            $('#dataManipulationModal').modal('hide');
        });
        $('#func_split').on('click', function () {
            $('.toggle').hide();
            $('#tagLine').hide();
            $('#logging').hide();
            $('#split_main').toggle();
            $('#dataManipulationModal').modal('hide');
        });
        $('#func_remove_index').on('click', function () {
            $('.toggle').hide();
            $('#tagLine').hide();
            $('#logging').hide();
            $('#remove_index_main').toggle();
            $('#dataManipulationModal').modal('hide');
        });
        $('#func_where').on('click', function () {
            $('.toggle').hide();
            $('#tagLine').hide();
            $('#logging').hide();
            $('#where_main').toggle();
            $('#dataManipulationModal').modal('hide');
        });

});

document.getElementById('rename_button').addEventListener('click', function() {
    const old_ = document.getElementById('rename_old_value').value; // Get the value from the input box
    const new_ = document.getElementById('rename_new_value').value; // Get the value from the input box
    const url = `/show_rename?old=${old_}&new=${new_}`;
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


document.getElementById('astype_button').addEventListener('click', function() {
    const col = document.getElementById('astype_column').value; // Get the value from the input box
    const dtype = document.getElementById('dtype').value; // Get the value from the input box
    const url = `/show_astype?col=${col}&dtype=${dtype}`;
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


document.getElementById('set_index_button').addEventListener('click', function() {
    const col = document.getElementById('set_index_column').value; // Get the value from the input box
    const url = `/show_set_index?col=${col}&dtype=${dtype}`;
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


document.getElementById('concat_button').addEventListener('click', function() {
    const col = document.getElementById('concat_column').value; // Get the value from the input box
    const agg_val=document.getElementById('aggregate_value').value; // Get the value from the input box
    const url = `/show_concat?col=${col}&agg_val=${agg_val}`;
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


document.getElementById('split_button').addEventListener('click', function() {
    const col = document.getElementById('split_column').value; // Get the value from the input box
    const val=document.getElementById('split_value').value; // Get the value from the input box
    const url = `/show_split?col=${col}&val=${val}`;
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


document.getElementById('remove_index_button').addEventListener('click', function() {
    const url = `/show_remove_index`;
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


  function validateInput() {
    var criteriaDropdown = document.getElementById("manipulation_criteria");
    var valueInput = document.getElementById("value");

    // Validate input based on the selected criteria
    switch (criteriaDropdown.value) {
      case "int":
        valueInput.value = valueInput.value.replace(/[^0-9]/g, ''); // Allow only integers
        break;
      case "str":
        // No specific validation for strings
        break;
      case "float":
        valueInput.value = valueInput.value.replace(/[^0-9.]/g, ''); // Allow only floats
        break;
      case "bool":
      valueInput.value = valueInput.value.replace(/[^0-1]/g, '');
        break;
    }
  }

document.getElementById('manipulation_criteria').addEventListener('change', function() {
      var selectedValue = this.value;
      var operatorSelect = document.getElementById('operator');

      // Hide all options first
      var options = operatorSelect.getElementsByTagName('option');
      for (var i = 0; i < options.length; i++) {
        options[i].style.display = 'none';
      }

      // Show options based on selected value
      var selectedOptions;

      if (selectedValue === 'int' || selectedValue === 'float') {
        selectedOptions = operatorSelect.getElementsByClassName('numeric');
      } else if (selectedValue === 'str') {
        selectedOptions = operatorSelect.getElementsByClassName('str');
      } else if (selectedValue === 'bool') {
        selectedOptions = operatorSelect.getElementsByClassName('bool');
      }

      for (var i = 0; i < selectedOptions.length; i++) {
        selectedOptions[i].style.display = 'block';
      }
    });

    document.getElementById('manipulation_criteria').dispatchEvent(new Event('change')); // Trigger change event on page load

document.getElementById('where_button').addEventListener('click', function() {
    const type= document.getElementById('manipulation_criteria').value; // Get the value from the input box
    const col = document.getElementById('column').value; // Get the value from the input box
    const val=document.getElementById('value').value; // Get the value from the input box
    const operator=document.getElementById('operator').value;
    const url = `/show_where?col=${col}&operator=${operator}&val=${val}&type=${type}`;
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
