$(document).on("click", "#addTaskSubmit", function (event) {
	// Add a task to the list
	// prevent default action of form submit
	event.preventDefault();

	var taskName				= $('#name').val();
	var taskExpirationDate      = $('#date-input').val();

	// validate user input
	var isValid			= true;
	var dateRegexEn		= /^\d{4}(.|-|\/)\d{2}(.|-|\/)\d{2}$/;

	// reset background color
	$('#name').css('background-color', '');
	$('#date-input').css('background-color', '');


	if (taskName === "") {
		$('#name').css('background-color', '#f2dede');
		isValid = false;
	}
	if (!taskExpirationDate.match(dateRegexEn)) {
		$('#date-input').css('background-color', '#f2dede');
		isValid = false;
	}

	// send form data to server
	if (isValid) {
		// show loading gif
		$('#loading-gif').show();
		
		data = {
			'taskName': taskName,
			'taskDate': taskExpirationDate
		};

		$.post('saveTask.php', data, function(data) {
			// add success msg
			$("#resultMsg").html('<p class="bg-success">'+data+'</p>').delay(3000).fadeOut(400);

			// reset input fields
			$('#name').val('');
			$('#date-input').val('');

			// reload all Tasks
			updateTaskTable();
		}).
		fail(function(error) {
			$('#resultMsg').html('<p class="bg-danger">'+error.statusText+'</p>').delay(3000).fadeOut(400);
		});

		// reset msg div
		$('#resultMsg').html('');
		$('#resultMsg').show();

		// hide loading gif
		$('#loading-gif').hide();
	}
});

$(document).on("click", "#updateTaskSubmit", function (event) {
	// Update completed tasks
	// prevent default action of form submit
	event.preventDefault();

	// show loading gif
	$('#loading-gif2').show();
	// update completed tasks
	var data = $('#updateTasks').serialize();

	$.post('updateTasks.php', data, function(data) {
		// add success msg
		$('#resultMsgTasks').html('<p class="bg-success">'+data+'</p>').delay(3000).fadeOut(400);
		updateTaskTable();
	})
	.fail(function(error) {
		$('#resultMsgTasks').html('<p class="bg-danger">'+error.statusText+'</p>').delay(3000).fadeOut(400);
	});

	// reset resultMsg div
	$('#resultMsgTasks').html('');
	$('#resultMsgTasks').show();

	// hide loading gif
	$('#loading-gif2').hide();
});

function getTasks() {
	// get all tasks from the database
	$.get('getTasks.php', function(data) {
		for(var i = 0; i < data.length; i++) {
			var row = $('<tr>');

			var isChecked = (Boolean(+data[i].completed)) ? 'checked' : '';
			var checkbox = '<input type="checkbox" name="completed[]" value="' + data[i].taskId + '" ' + isChecked + '>';

			row.append($('<td>').html(checkbox));
			row.append($('<td>').html(data[i].taskName));
			row.append($('<td>').html(data[i].taskExpirationDate));

			$('#tasks').append(row);
		}
	});
}

function updateTaskTable() {
	// updates the task table
	$('#tasks > tbody').empty();
	getTasks();
}