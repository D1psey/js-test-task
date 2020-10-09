$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus');
})

let getProjects = () => {
	$.get('/getProjects', data => {
		$('.greengerty').html('');
		data.map((el) => {
			$('.greengerty').append(`<tr class="hoverable"><th class="hoverable"><input type="checkbox" data-id="`+el._id+`"></th>
										 <td class="hoverable project-item name-`+el._id+`" data-id="`+el._id+`">`+el.name+`</td>
										 <td class="hoverable">
										 	<div class="btn-group nahover">
										 		<img class="gimg btn edit" data-id="`+el._id+`" data-toggle='modal' data-target='#exampleModal' src="/images/pencil.png">
										 		<img class="gimg btn delete" data-id="`+el._id+`" src="/images/trash.png">
										 								</div></td></tr>`);
			$(".spinner-border").animate({opacity:0}, 200);
		});
	});
}

$(document).ready(() => {
	getProjects();
});

let helloWorld = (id) => {
	$.get('/getTasks', {"id": id}, data => {
		$('.greengerty').html('');
		data.map((el) => {
			$(".greengerty").append(`<tr class="hoverable"><th class="hoverable"><input type="checkbox" data-id="`+el._id+`"></th>
										 <td class="hoverable name-`+el._id+`" data-id="`+el._id+`">`+el.name+`</td>
										 <td class="hoverable">
										 	<div class="btn-group nahover">
										 		<img class="gimg btn" src="/images/updown.png">
										 		<img class="gimg btn edit" data-id="`+el._id+`" data-toggle='modal' data-target='#exampleModal' src="/images/pencil.png">
										 		<img class="gimg btn delete" data-id="`+el._id+`" src="/images/trash.png">
										 								</div></td></tr>`);
			$(".spinner-border").animate({opacity:0}, 200);
		});	
	});
}

$('.greengerty').on('click', '.add', () => {
	$(".spinner-border").animate({opacity:1}, 200);
	let parameters = {"name": $(".addTaskText").val() };
	$('.addTaskText').val('');
	$.get('/addTask', parameters).done(() => helloWorld());
});

$(".greengerty").on('click', '.edit', () =>{
	$(".spinner-border").animate({opacity:1}, 200);
	var before = $(".name-"+event.target.dataset.id).text();
	$(".message-text").val(before);
	$(".message-text").attr("data-before", before);			
});

$(".btn-edit-confirm").on('click',() => {
	let after = $('.message-text').val();
	let before = $(".message-text").attr("data-before");
	let parameters = {'before': before, 'after': after}
	$.get("/editTask", parameters).done(() => helloWorld());
});

$(".greengerty").on('click', '.delete', () => {	
	let parameters = {"_id": event.target.dataset.id}
	$.get('/deleteTask', parameters).done(() => helloWorld()); 
	$(".spinner-border").animate({opacity:1}, 200);
});

$('.task-list').click(() => {
	getProjects();
});

$('.greengerty').on('click', '.project-item', () => {
	let id = event.target.dataset.id;
	helloWorld(id);
});
