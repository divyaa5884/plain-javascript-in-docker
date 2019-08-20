// var to get selected lead's id (used in update communication and deletion of lead)
var selectedLead=null;

function renderDynamicContent() {
    $.ajax({
        url: "http://localhost:8080/api/leads",
        type: 'GET',
        dataType: 'json', // added data type
        success: function(res) {
        	var trHTML='';
        	if(res.length == 0) {
        		$('#leads-table-item').html('<tr><td class="no-leads" colspan="6">No Leads Found!</td></tr>');
        	}
        	else {
	            for(var i=0; i<res.length; i++){
		           trHTML=trHTML+'<tr><td>'+res[i].first_name+' '+res[i].last_name+
		           '</td><td>'+res[i].email+
		           '</td><td>'+res[i].mobile+
		           '</td><td>'+res[i].location_type+
		           '</td><td>'+res[i].location_string+
		           '</td><td><span class="update-icon-'+i+
		           '" onclick="getSelectedLeadId('+res[i].id+')" data-toggle="modal" data-target="#mark-lead-modal"><i class="fa fa-pencil"></i></span><span class="delete-icon-'+i+
		           '" onclick="getSelectedLeadId('+res[i].id+')" data-toggle="modal" data-target="#delete-lead-modal"><i class="fa fa-trash fa-lg"></i></span></td></tr>'; 
		        }
		        $('#leads-table-item').html(trHTML);
		    }
	    },
        error:function(res){
        	console.log(res);
        	$('#leads-table-item').html('<tr><td class="no-leads" colspan="6">Some error occurred!</td></tr>');
        }
    });
}

function doValidate() {
	// validating all input fields
	var first_name = $('input[name="first_name"]').val().trim();
	var last_name = $('input[name="last_name"]').val().trim();
	var email = $('input[name="email"]').val();
	var mobile = $('input[name="mobile"]').val();
	var location_type = $('#location_type').val();
	var location_string = $('input[name="location_string"]').val().trim();

	// if any of the field is not present, it will give error
	if(!first_name || !last_name || !email || !mobile || !location_type || !location_string) {
		$(".req-fields").html("*All fields are Required");
		$("#lead-form .req-fields").removeClass("hidden");
		return false;
	}

	//validate name : checking first name for atleast 3 characters and if they are all alphabets
	var regFirstName = /^[a-z]+$/i;
	if(first_name.length < 3 || !regFirstName.test(first_name)) {
	    $('input[name="first_name"]').closest(".form-group").addClass("has-error");
	    $(".req-fields").removeClass("hidden");
	    $(".req-fields").html("Please enter a name of 3 characters or more.");
	    return false;
	}
	//validate email using regex
	var regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;	
	if(!regEmail.test(email)){
		$('input[name="email"]').closest(".form-group").addClass("has-error");
		$(".req-fields").removeClass("hidden");
	    $(".req-fields").html("Please enter a valid Email Id");
	    return false;
	}
	var regNumber = /[0-9 -()+]+$/;
	if(mobile.length < 6 || !regNumber.test(mobile)) {
		$('input[name="mobile"]').closest(".form-group").addClass("has-error");
		$(".req-fields").removeClass("hidden");
	    $(".req-fields").html("Please enter a valid Mobile number");
	    return false;
	}
	return true;
}

function submitLeadData(){
	// hiding validation error ele at first
    $("#lead-form .req-fields").addClass("hidden");
    $("#lead-form .form-group").removeClass('has-error');
    $(".msg-on-submission").html('');
	if(doValidate()){
		var data = $('#lead-form').serialize();
		$.ajax({
		  type: "POST",
		  url: "http://localhost:8080/api/leads/",
		  data: data,
		  dataType: 'json',
		  success: function(res){
		  	$(".msg-on-submission").html('Data Saved Successfully!');
		  	setTimeout(function(){
				restoreDefaultVal();
				$('#add-lead-modal').modal('hide')
			}, 800);
		  	renderDynamicContent();
		  },
		  error: function(res){
		  	console.log(res);
		  	if(res.responseJSON){
		  		// email id already present in previous leads
		  		$(".msg-on-submission").html(res.responseJSON["email"]);
		  	}
		  	else {
		  		$(".msg-on-submission").html("Location type should be City or Country");
		  	}
		  }
		});
	}
}
function restoreDefaultVal() {
	$("#lead-form input").val("");
	$(".msg-on-submission").html('');
	$("#lead-form .req-fields").addClass("hidden");
}
function deleteSelectedLead(){
	$.ajax({
	    url: 'http://localhost:8080/api/leads/'+selectedLead,
	    type: 'DELETE',
	    success: function(res) {
	       console.log("DELETED");
	       $("#delete-lead-modal .msg-on-submission").html('Deleted Successfully!');
	       renderDynamicContent();
	       setTimeout(function(){
				$('#delete-lead-modal').modal('hide')
			}, 800);
    	},
    	error: function(res){
		  	console.log("ERROR");
		  	console.log(res);
		  	$("#delete-lead-modal .msg-on-submission").html('Some error occurred!');
		}
	});
}

function getSelectedLeadId(id) {
	selectedLead = id;
	restoreDefCommDel();
}
function restoreDefCommDel(){
	// emptying previously filled msg, fields
	$(".msg-on-submission").html('');
	$("#mark-comm-form textarea").val('');
	$("#mark-comm-form .form-group").removeClass('has-error');
}
function markCommunicationLead() {
	var commVal = $("#mark-comm-form textarea").val().trim();
	if(commVal.length > 0){
		var dataObject = { 'communication': commVal };
		$.ajax({
	        url: "http://localhost:8080/api/mark_lead/"+selectedLead,
	        type: 'PUT',
	        dataType: 'json',
	        data: dataObject,
	        success: function(res) {
	        	console.log(res);
	        	$("#mark-lead-modal .msg-on-submission").html("Contacted");
	        	setTimeout(function(){
					$('#mark-lead-modal').modal('hide')
				}, 800);
				restoreDefCommDel();
		    },
	        error:function(res){
	        	console.log(res);
	        	$("#mark-lead-modal .msg-on-submission").html("Unable to update");
	        }
	    });
	}
	else{
		$("#mark-comm-form .form-group").addClass('has-error');
		$("#mark-lead-modal .msg-on-submission").html("Field can't be empty");
	}
	
}

