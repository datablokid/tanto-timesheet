
var globalJoborder={
	modul:null,
	baris:0,
	job_blok:null
}

var gJob=globalJoborder;

var jsJoborderlookup={
	halaman:null,
	action:null,

	viewFind: function(modul,baris,job_blok){

		gJob.modul=modul;
		gJob.baris=baris;
		gJob.job_blok=job_blok;
		
		document.getElementById('id01').style.display='block';

		let obj = {
			"login_blok":g.login_blok
		};
		
		if (this.halaman==null){

			loadDoc(myServer+"joborder/read_paging.php",this.showModal, obj); 
			
		}else{

			loadDoc(this.halaman,this.showModal, obj)
		}

		txt = '<p>';
		txt += '<input type="text" onkeyup="jsJoborderlookup.searchModal(this.value)" placeholder="Type to search..." id="cari" value="" class="w3-input w3-border">';
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

		txt+="<th>Job Order</th>";
		
		txt+="<th class='w3-center'>Action</th>";
		
		txt+="</tr></thead>";
		if (venom.err==0){
			
			for (x in venom.data) {
				txt += "<tr>";
				txt += "<td>"+venom.data[x].job_number + "</td>";
				txt += "<td class='w3-center'><input type='button' onClick='jsJoborderlookup.klikPilih(\"" + venom.data[x].job_blok + "\",\"" + venom.data[x].job_number + "\")' value='Select' class='w3-btn w3-theme-l5 w3-border w3-round-large'></td>";
				txt += "</tr>";
			}
		}
		
		else{
			
			txt += "<tr><td>no record</td></tr>";
			
		}
		
		txt+="</table>";
		txt+="</div>";
		
		document.getElementById('headerModal').innerHTML = "Job Order";
		document.getElementById('isiModal').innerHTML = txt;	
		document.getElementById('countModal').innerHTML = venom.msg;	
		document.getElementById('pageModal').innerHTML = "";	
		
	
	},		

	klikPilih: function(job_blok,job_number){

		document.getElementById('id01').style.display='none'
		
		if (gJob.modul =='task todo'){
			
			jsTask.readJob(job_blok,job_number);
			
		}
		

	},
		
	searchModal: function (ini){
	
		this.action="search";
	
		if (ini.length==0){

			this.halaman=null;

			jsJoborderlookup.viewFind(gJob.modul, gJob.baris, gJob.job_blok);
			
		}else{
			
			let obj = {
				"login_blok":g.login_blok,
				"search": ini
			};
			
			loadDoc(myServer + "joborder/search.php",this.showModal, obj); 
		
		}

	}
	

}
