
var jsMenuuser={

	viewRead: function(){
		
		var txt='';
		
		txt+='<div>';
		
		txt+='<button onclick="menuFunction(\'Timesheet\')" class="w3-bar-item w3-button w3-theme-l1" >Timesheet&nbsp<i class="fa fa-caret-down"></i></button>';
		txt+='<div id="Timesheet"  class="w3-hide">';
		txt+="<input type ='button' onClick='jsMenuuser.menuKlik(this)' value='Job Order' class='w3-bar-item w3-button'> ";
		txt+="<input type ='button' onClick='jsMenuuser.menuKlik(this)' value='Person' class='w3-bar-item w3-button'> ";
		txt+="<input type ='button' onClick='jsMenuuser.menuKlik(this)' value='Task Todo' class='w3-bar-item w3-button'> ";
		txt+="<input type ='button' onClick='jsMenuuser.menuKlik(this)' value='Time Card' class='w3-bar-item w3-button'> ";
		txt+='</div>';
		txt+='</div>';
		
		document.getElementById("menuUser").innerHTML = txt;

	},
	
	menuKlik(nameMenu){

		w3_close();
		switch (nameMenu.value){
			
			case "Person":
				jsPerson.viewRead();
				break;
				
			case "Job Order":
				jsJoborder.viewRead();
				break;

			case "Task Todo":
				jsTask.viewRead();
				break;
				
			case "Time Card":
				jsTime.viewRead();
				break;

		}
	}
}
