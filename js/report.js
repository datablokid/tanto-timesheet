jsReport={
	personHours: function(){

		var layout='';
		layout +='<div class="w3-container w3-theme-d5 w3-round-large">';
		layout +='<h3>Person Hours</h3>';
		layout +='</div>';
		
		layout +='<div class="w3-container w3-card">';
		layout +='<br>';
		layout +='<p id="person_hours"></p>';
		layout +='</div>';
		layout +='</div>';
		
		document.getElementById('viewMid').innerHTML = layout;
		
		loadDoc(myServer+"report/person_hours.php",this.showdata_person, {"login_blok":g.login_blok}); 

		
	},
	
	showdata_person: function(xhttp){

		var txt='';
		var drax = JSON.parse(xhttp.responseText);
		
		txt ='<div class="w3-responsive">';
		txt+='<table border=1 class="w3-table-all">';
		txt+='<thead><tr class="w3-theme-l1">';

		txt+="<th>No.</th>";
		txt+="<th>Name</th>";
		txt+="<th>Function</th>";
		txt+="<th>Total Hours</th>";
		
		txt+="</tr></thead>"

		if (drax.err==0){
			
			for (x in drax.data) {
				txt+='<tr>';
				txt+='<td>'+drax.data[x].nomer+'</td>';
				txt+='<td>'+drax.data[x].person_name+'</td>';
				txt+='<td>'+drax.data[x].person_function+'</td>';
				txt+='<td class="w3-center">'+drax.data[x].total_hours+'</td>';
				txt+='</tr>';
			}
		}
		
		txt+="</table></div>";
		
		document.getElementById('person_hours').innerHTML = txt;

	},
	
	taskHours: function(){

		var layout='';
		layout +='<div class="w3-container w3-theme-d5 w3-round-large">';
		layout +='<h3>Task Hours</h3>';
		layout +='</div>';
		
		layout +='<div class="w3-container w3-card">';
		layout +='<p id="task_hours"></p>';
		layout +='</div>';
		layout +='</div>';
		
		document.getElementById('viewMid').innerHTML = layout;

		loadDoc(myServer+"report/task_hours.php",this.showdata_task, {"login_blok":g.login_blok}); 
		
	},
	
	showdata_task: function(xhttp){
		//alert(xhttp.responseText);
		
		var txt='';
		var drax = JSON.parse(xhttp.responseText);
		
		txt ='<div class="w3-responsive">';
		txt+='<table border=1 class="w3-table-all">';

		txt+='<thead><tr class="w3-theme-l1">';

		txt+="<th>No.</th>";
		txt+="<th>Job Order</th>";
		txt+="<th>Task Code</th>";
		txt+="<th>Task Date</th>";
		txt+="<th>Total Hours</th>";
		txt+="<th>Name</th>";
		txt+="<th>Function</th>";
		txt+="<th>Note activity</th>";
		txt+="<th>Man Hours</th>";
		txt+="</tr></thead>"

		var person;
		if (drax.err==0){
			
			for (x in drax.data) {
				txt+='<tr>';
				txt+='<td>'+drax.data[x].nomer+'</td>';
				txt+='<td>'+drax.data[x].job_number+'</td>';
				txt+='<td>'+drax.data[x].task_code+'</td>';
				txt+='<td>'+drax.data[x].task_date+'</td>';
				txt+='<td class="w3-center"><strong>'+drax.data[x].total_hours+'</strong></td>';
				
				
					person=drax.data[x].person;
					
					for (y in person.person) {
						if (y==0){
							txt+="<td>"+person.person[y].person_name+"</td>";
							txt+="<td>"+person.person[y].person_function+"</td>";
							txt+="<td>"+person.person[y].person_note+"</td>";
							txt+="<td class='w3-center'>"+person.person[y].person_hours+"</td>";
						}
						else{
							txt+="<tr><td colspan=5>";
							txt+="<td>"+person.person[y].person_name+"</td>";
							txt+="<td>"+person.person[y].person_function+"</td>";
							txt+="<td>"+person.person[y].person_note+"</td>";
							txt+="<td class='w3-center'>"+person.person[y].person_hours+"</td>";
							txt+="</td></tr>";
						}	
					}
				
				txt+='</tr>';
				
			}
		}
		
		txt+="</table></div>";
		
		document.getElementById('task_hours').innerHTML = txt;
	},
	
	jobHours: function(){

		var layout='';
		layout +='<div class="w3-container w3-theme-d5 w3-round-large">';
		layout +='<h3>Job Hours</h3>';
		layout +='</div>';
		
		layout +='<div class="w3-container w3-card">';
		layout +='<p id="job_hours"></p>';
		layout +='</div>';
		layout +='</div>';
		
		document.getElementById('viewMid').innerHTML = layout;
	}
}
