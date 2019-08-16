var jsMenu={

	viewRead: function(){

		var obj = {"login_blok":g.login_blok};
		
		loadDoc(myServer+"menu/read.php",this.showMenu, obj); 

	},
	
	showMenu: function (xhttp) {

		var txt;
		var wiro = JSON.parse(xhttp.responseText);

		txt='<div">';
		
		var kelompok, cetak;
		
		for (x in wiro.data) {
			
			cetak = '<button onclick="menuFunction(\''+wiro.data[x].menu_group+'\')" class="w3-bar-item w3-button w3-theme-l1" >'+wiro.data[x].menu_group+'&nbsp<i class="fa fa-caret-down"></i></button>';
			
			if (x==0){
				kelompok = wiro.data[x].menu_group;
				txt+=cetak;
				
				txt += '<div id='+wiro.data[x].menu_group+'  class="w3-hide">';
			}
			
			if (kelompok!=wiro.data[x].menu_group){
				
				txt += '</div>';	
				
				txt+=cetak;
				txt += '<div id='+wiro.data[x].menu_group+'  class="w3-hide">';
				
				txt += "<input type ='button' onClick='jsMenu.menuKlik(this)' value='"+wiro.data[x].menu_name+"' class='w3-bar-item w3-button'> ";
			}
			else{

				txt += "<input type ='button' onClick='jsMenu.menuKlik(this)' value='"+wiro.data[x].menu_name+"' class='w3-bar-item w3-button'>";
				
			}
			
			kelompok = wiro.data[x].menu_group;
						
		}
		
		txt +='</div>';

		document.getElementById("menu").innerHTML = txt;
	},
	
	menuKlikx(x){
		alert(x);
	},

	menuKlik(nameMenu){

		w3_close();
		switch (nameMenu.value){

			case "Profile":
				jsProfile.viewRead();
				break;

			case "User":
				oUser.viewRead();
				break;
				
			case "Default":
				jsDef.viewUpdate();
				break;

			case "Blok":
				jsBlok.viewRead();
				break;

			// Timesheet
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

			// report
			case "Person Hours":
				jsReport.personHours();
				break;				

			case "Task Hours":
				jsReport.taskHours();
				break;				

			case "Job Hours":
				jsReport.jobHours();
				break;				
			
		}
	}
}


// Open and close the sidebar on medium and small screens
function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}

// Accordions
function menuFunction(id) {
  var x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
    x.previousElementSibling.className += " w3-theme";
  } else { 
    x.className = x.className.replace("w3-show", "");
    x.previousElementSibling.className = 
    x.previousElementSibling.className.replace(" w3-theme", "");
  }
}
