var globalPerson={
	modul:null,
	baris:0,
	person_blok:null
}

var gPerson=globalPerson;

var jsPersonlookup={
	action:null,
	halaman:null,

	viewFind: function(modul,baris,person_blok){
		
		gPerson.modul=modul;
		gPerson.baris=baris;
		gPerson.person_blok=person_blok;
		
		document.getElementById('id01').style.display='block';

		this.action="read";
		
		let obj = {
			"login_blok":g.login_blok
		};
		
		if (this.halaman==null){

			loadDoc(myServer+"person/read_paging.php",this.showModal, obj); 
			
		}else{

			loadDoc(this.halaman,this.showModal, obj)
		}

		txt = '<p>';
		txt += '<input type="text" onkeyup="jsPersonlookup.searchModal(this.value)" placeholder="Type to search..." id="cari" value="" class="w3-input w3-border">';
		txt += '</p>';
		document.getElementById('searchModal').innerHTML = txt;	
		document.getElementById("cari").focus();

	},
	
	showModal: function(xhttp){
		
		var venom = JSON.parse(xhttp.responseText);
		
		var txt='';
		txt ='<div class="w3-responsive">';
		txt+='<table border=1 class="w3-table-all">';
		txt+='<thead><tr class="w3-theme-d4">';

		txt+="<th>Name</th>";
		txt+="<th>Function</th>";
		
		txt+="<th class='w3-center'>Action</th>";
		
		txt+="</tr></thead>";
		if (venom.err==0){
			
			for (x in venom.data) {
				txt += "<tr>";
				txt += "<td>"+venom.data[x].person_name + "</td>";
				txt += "<td>"+venom.data[x].person_function + "</td>";
				txt += "<td class='w3-center'><input type='button' onClick='jsPersonlookup.klikPilih(\"" + venom.data[x].person_blok + "\",\"" + venom.data[x].person_name + "\",\"" + venom.data[x].person_function + "\")' value='Select' class='w3-btn w3-theme-l5 w3-border w3-round-large'></td>";
				txt += "</tr>";
			}

		}
		
		else{
			
			txt += "<tr><td>no record</td></tr>";
			
		}
		
		txt+="</table>";
		txt+="</div>";
		
		document.getElementById('headerModal').innerHTML = "Person";
		document.getElementById('isiModal').innerHTML = txt;
		document.getElementById('countModal').innerHTML = "Total record: <span class='w3-tag w3-theme-l1'>"+venom.msg+'</span>';
		
		// page modal
		txt="";
		
		if (jsPersonlookup.action=="read"){
			
			if (venom.err===0){
				
				if (venom.paging.first!=""){
					
					txt+= "<input type='button' value= 'First' onclick='jsPersonlookup.gotoPage(\"" + venom.paging.first + "\")' class='w3-btn w3-theme-l5 w3-border w3-round'>&nbsp;" ;
					
				}
				
				for (x in venom.paging.pages) {
					
					if (venom.paging.pages[x].current_page=="yes"){
						
						txt+= "<input type='button' value = '"+ venom.paging.pages[x].page +"' onclick='jsPersonlookup.gotoPage(\"" + venom.paging.pages[x].url + "\")' disabled class='w3-btn w3-theme-l5 w3-border w3-round' >&nbsp;";	
						
					} 
					else{
						
						txt+= "<input type='button' value = '"+ venom.paging.pages[x].page +"' onclick='jsPersonlookup.gotoPage(\"" + venom.paging.pages[x].url + "\")' class='w3-btn w3-theme-l5 w3-border w3-round'>&nbsp;";	
						
					}

				}
				
				if (venom.paging.last!=""){
					
					txt+= "<input type='button' value= 'Last' onclick='jsPersonlookup.gotoPage(\"" + venom.paging.last + "\")' class='w3-btn w3-theme-l5 w3-border w3-round'>&nbsp;" ;
					
				}
				
			}
			
		}
		document.getElementById('pageModal').innerHTML = txt;
	
	},		

	klikPilih: function(person_blok, person_name, person_function){
		
		document.getElementById('id01').style.display='none'
		
		if (gPerson.modul =='task todo'){

			jsTask.readPerson(person_blok,person_name,person_function);
			
		}

	},
		
	searchModal: function (ini){
	
		if (ini.length==0){

			this.halaman=null;

			jsPersonlookup.viewFind(gPerson.modul, gPerson.baris, gPerson.person_blok);
			
		}else{
			this.action="search";
			
			let obj = {
				"login_blok":g.login_blok,
				"search": ini
			};
			
			loadDoc(myServer + "person/search.php",this.showModal, obj); 
		
		}

	},
	
	gotoPage: function (ini){

		this.halaman = ini;
		
		this.viewFind(gPerson.modul, gPerson.baris, gPerson.person_blok);

	},

	

}
