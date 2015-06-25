$(function () {
		
		
		var costDepartments_for_income = {"allCategories": [{name: "N/S FLOORO", y: -988.637957286, color:'red'}, {name: "RADIOLOGY SUPPLIES - GENERAL", y: -33.1305241991, color: 'red'}, {name: "PHARMACY COMBINED", y: -7264.47303703, color: 'red'}, {name: "NUCLEAR MEDICINE CHS", y: -5137.95240882, color: 'red'}, {name: "ECG", y: 139.811580086}, {name: "ADULT NON-INVASIVE LAB", y: 105.242530394}, {name: "RESPIRATORY THERAPY", y: -4630.89882263, color: 'red'}, {name: "RADIOLOGY SUPPLIES - IR", y: -96.1576864046, color: 'red'}, {name: "O.R. - PATIENT CHARGEABLES", y: -1220.21219017, color: 'red'}, {name: "CL-MICRO - SEROLOGY", y: -50.0811969674, color: 'red'}, {name: "CLIN LABS CHEMISTRY", y: 5536.68342136}, {name: "CL - SUPPORT SERVICES PHLEBOTOMY", y: -1095.00724911, color: 'red'}, {name: "CL-HEM SPECIAL PROCEDURE", y: -908.735775528, color: 'red'}, {name: "RESPIRATORY THERAPY", y: -194.71, color: 'red'}, {name: "OR SATELLITE LAB",y: -777.63908427, color: 'red'}, {name: "CLIN LABS MICROBIOLOGY", y: -5577.37833384, color: 'red'}, {name: "CL-CHEM - MOLECULAR PATHOLOGY", y: -237.40568585, color: 'red'}, {name: "PATHOLOGY HISTOLOGY", y: -90.3327115972, color: 'red'}, {name: "CL- CYTOGENETICS", y: -6019.54482522, color: 'red'}, {name: "PATHOLOGY - IMMUNOLOGY", y: -365.278865621, color: 'red'}, {name: "CL HEM ALTERNATE SITE TESTING", y: 81.8794318866}, {name: "CLIN LABS OUTSIDE CHEMISTRY", y: -1532.54577387, color: 'red'}, {name: "PATHOLOGY SURGICAL PATHOLOGY", y: -848.610655942, color: 'red'}, {name: "CLIN LABS BLOOD BANK",y: -1930.47297139, color: 'red'}, {name: "OPERATING ROOM", y: -4957.95466602, color: 'red'}, {name: "PTU PATIENT PRE-TREATMENT UNIT", y: -122.206638007, color: 'red'}, {name: "PACU POST ANESTHESIA CARE UNIT", y: -477.072795729, color: 'red'}, {name: "RADIOLOGY - IR", y: 397.696120372}, {name: "MEDICAL PROCEDURES UNIT MP", y: -320.666071742, color: 'red'}, {name: "NUCLEAR MEDICINE CHS", y: -530.904062774, color: 'red'}, {name: "N/S FLOORI", y: -376.065202698, color: 'red'}, {name: "N/S FLOORB", y: -10118.8560809, color: 'red'}, {name: "N/S FLOORO", y: -316.53, color: 'red'}, {name: "OPERATING ROOM/ANESTH SUPPORT", y: 21.7399496155}, {name: "CLIN LABS BLOOD BANK", y: -13544.8314496, color: 'red'}, {name: "RADIOLOGY SUPPLIES - IR", y: -129.0427079, color: 'red'}, {name: "PHARMACY COMBINED", y: -255.362358434, color: 'red'}, {name: "N/S ICUB",y: -508.842171212, color: 'red'}, {name: "N/S FLOORB", y: -1137.1952027, color: 'red'}, {name: "N/S FLOORF", y: -433.370405396, color: 'red'}, {name: "N/S ICUD", y: -28530.1509056, color: 'red'}, {name: "RESPIRATORY THERAPY", y: 385.456880045, color: 'red'}, {name: "SPEECH CLINIC", y: -32.7428125548, color: 'red'}, {name: "PHY/OCC THERAPY - INPATIENT", y: -1207.52126982, color: 'red'}, {name: "RADIOLOGY MRI", y: 305.638202285}, {name: "RADIOLOGY DIAGNOSTIC", y: -1258.49249295, color: 'red'}, {name: "RADIOLOGY CT", y: 572.20606065}, {name: "RADIOLOGY - IR", y: -61.8380788609, color: 'red'}], 

"Blood": [{name: "CLIN LABS BLOOD BANK", y: -13544.8314496, color: 'red'}], 

"Cardiology": [{name: "ECG", y: 139.811580086}, {name: "ADULT NON-INVASIVE LAB", y: 105.242530394}],
 
"ICUCCU": [{name: "N/S ICUB", y: -508.842171212, color:'red'}, {name: "N/S FLOORB", y: -1137.1952027, color:'red'}, {name: "N/S FLOORF", y: -433.370405396, color:'red'}, {name: "N/S ICUD", y: -28530.1509056, color:'red'}], 

"Imaging": [{name: "RADIOLOGY MRI", y: 305.638202285}, {name: "RADIOLOGY DIAGNOSTIC", y: -1258.49249295, color:'red'}, {name: "RADIOLOGY CT", y: 572.20606065}, {name: "RADIOLOGY - IR", y: -61.8380788609, color:'red'}],

"Implants": [{name: "RADIOLOGY SUPPLIES - IR", y: -96.1576864046, color:'red'}, {name: "O.R. - PATIENT CHARGEABLES", y: -1220.21219017, color:'red'}], 

"LabPath": [{name: "CL-MICRO - SEROLOGY", y: -50.0811969674, color:'red'}, {name: "CLIN LABS CHEMISTRY", y: 5536.68342136}, {name: "CL - SUPPORT SERVICES PHLEBOTOMY", y: -1095.00724911, color:'red'}, {name: "CL-HEM SPECIAL PROCEDURE", y: -908.735775528, color:'red'}, {name: "RESPIRATORY THERAPY", y: -194.71, color:'red'}, {name: "OR SATELLITE LAB", y: -777.63908427, color:'red'}, {name: "CLIN LABS MICROBIOLOGY", y: -5577.37833384, color:'red'}, {name: "CL-CHEM - MOLECULAR PATHOLOGY", y: -237.40568585, color:'red'}, {name: "PATHOLOGY HISTOLOGY", y: -90.3327115972, color:'red'}, {name: "CL- CYTOGENETICS", y: -6019.54482522, color:'red'}, {name: "PATHOLOGY - IMMUNOLOGY", y: -365.278865621, color:'red'}, {name: "CL HEM ALTERNATE SITE TESTING", y: 81.8794318866}, {name: "CLIN LABS OUTSIDE CHEMISTRY", y: -1532.54577387, color:'red'}, {name: "PATHOLOGY SURGICAL PATHOLOGY", y: -848.610655942, color:'red'}, {name: "CLIN LABS BLOOD BANK", y: -1930.47297139, color:'red'}],

"MedSurg": [{name: "N/S FLOORO", y: -988.637957286, color:'red'}], 

"ORRecovery": [{name: "OPERATING ROOM", y: -4957.95466602, color:'red'}, {name: "PTU PATIENT PRE-TREATMENT UNIT", y: -122.206638007, color:'red'}, {name: "PACU POST ANESTHESIA CARE UNIT", y: -477.072795729, color:'red'}, {name: "RADIOLOGY - IR", y: 397.696120372}], 

"Other": [{name: "MEDICAL PROCEDURES UNIT MP", y: -320.666071742, color:'red'}, {name: "NUCLEAR MEDICINE CHS", y: -530.904062774, color:'red'}, {name: "N/S FLOORI", y: -376.065202698, color:'red'}, {name: "N/S FLOORB", y: -10118.8560809, color:'red'}, {name: "N/S FLOORO", y: -316.53, color:'red'}, {name: "OPERATING ROOM/ANESTH SUPPORT", y: 21.7399496155}], 

"PTOTSpeechAudio": [{name: "RESPIRATORY THERAPY", y: 385.456880045}, {name: "SPEECH CLINIC", y: -32.7428125548, color:'red'}, {name: "PHY/OCC THERAPY - INPATIENT", y: -1207.52126982, color:'red'}], 

"PharmacyIV": [{name: "RADIOLOGY SUPPLIES - GENERAL", y: -33.1305241991, color:'red'}, {name: "PHARMACY COMBINED",y: -7264.47303703, color:'red'}, {name: "NUCLEAR MEDICINE CHS", y: -5137.95240882, color:'red'}], 

"RespiratoryTherapy": [{name: "RESPIRATORY THERAPY", y: -4630.89882263, color:'red'}], 

"SuppliesDME": [{name: "RADIOLOGY SUPPLIES - IR", y: -129.0427079, color:'red'}, {name: "PHARMACY COMBINED", y: -255.362358434, color:'red'}]};
		
		
		//data = costDepartments_for_income.allCategories;
		//var categories = array();
		
		/*for (i=0; i<costDepartments_for_income.allCategories.length; i++) {
			var fetched_row = costDepartments_for_income.allCategories[i];
		}*/
		
		function update_income_chart() {
				
				var category = $("#categories  li.active").text();
				
				var costDepartmentNames = '{"All Categories": ["N/S FLOORO", "RADIOLOGY SUPPLIES - GENERAL", "PHARMACY COMBINED", "NUCLEAR MEDICINE CHS", "ECG", "ADULT NON-INVASIVE LAB", "RESPIRATORY THERAPY", "RADIOLOGY SUPPLIES - IR", "O.R. - PATIENT CHARGEABLES", "CL-MICRO - SEROLOGY", "CLIN LABS CHEMISTRY", "CL - SUPPORT SERVICES PHLEBOTOMY", "CL-HEM SPECIAL PROCEDURE", "RESPIRATORY THERAPY", "OR SATELLITE LAB", "CLIN LABS MICROBIOLOGY", "CL-CHEM - MOLECULAR PATHOLOGY", "PATHOLOGY HISTOLOGY", "CL- CYTOGENETICS", "PATHOLOGY - IMMUNOLOGY", "CL HEM ALTERNATE SITE TESTING", "CLIN LABS OUTSIDE CHEMISTRY", "PATHOLOGY SURGICAL PATHOLOGY", "CLIN LABS BLOOD BANK", "OPERATING ROOM", "PTU PATIENT PRE-TREATMENT UNIT", "PACU POST ANESTHESIA CARE UNIT", "RADIOLOGY - IR", "MEDICAL PROCEDURES UNIT MP", "NUCLEAR MEDICINE CHS", "N/S FLOORI", "N/S FLOORB", "N/S FLOORO", "OPERATING ROOM/ANESTH SUPPORT", "CLIN LABS BLOOD BANK", "RADIOLOGY SUPPLIES - IR", "PHARMACY COMBINED", "N/S ICUB", "N/S FLOORB", "N/S FLOORF", "N/S ICUD", "RESPIRATORY THERAPY", "SPEECH CLINIC", "PHY/OCC THERAPY - INPATIENT", "RADIOLOGY MRI", "RADIOLOGY DIAGNOSTIC", "RADIOLOGY CT", "RADIOLOGY - IR"], "Blood": ["CLIN LABS BLOOD BANK"], "Cardiology": [ "ECG", "ADULT NON-INVASIVE LAB"], "ICU & CCU": [ "N/S ICUB", "N/S FLOORB", "N/S FLOORF", "N/S ICUD"], "Imaging": [ "RADIOLOGY MRI", "RADIOLOGY DIAGNOSTIC", "RADIOLOGY CT", "RADIOLOGY - IR"], "Implants": [ "RADIOLOGY SUPPLIES - IR", "O.R. - PATIENT CHARGEABLES"], "Lab & Path": [ "CL-MICRO - SEROLOGY", "CLIN LABS CHEMISTRY", "CL - SUPPORT SERVICES PHLEBOTOMY", "CL-HEM SPECIAL PROCEDURE", "RESPIRATORY THERAPY", "OR SATELLITE LAB", "CLIN LABS MICROBIOLOGY", "CL-CHEM - MOLECULAR PATHOLOGY", "PATHOLOGY HISTOLOGY", "CL- CYTOGENETICS", "PATHOLOGY - IMMUNOLOGY", "CL HEM ALTERNATE SITE TESTING", "CLIN LABS OUTSIDE CHEMISTRY", "PATHOLOGY SURGICAL PATHOLOGY", "CLIN LABS BLOOD BANK"], "Med/Surg": [ "N/S FLOORO"], "OR/Recovery": [ "OPERATING ROOM", "PTU PATIENT PRE-TREATMENT UNIT", "PACU POST ANESTHESIA CARE UNIT", "RADIOLOGY - IR"], 	"Other": [ "MEDICAL PROCEDURES UNIT MP", "NUCLEAR MEDICINE CHS", "N/S FLOORI", "N/S FLOORB", "N/S FLOORO", "OPERATING ROOM/ANESTH SUPPORT"], 	"PT/OT/Speech/Audio": [ "RESPIRATORY THERAPY", "SPEECH CLINIC", "PHY/OCC THERAPY - INPATIENT"], "Pharmacy & IV": [ "RADIOLOGY SUPPLIES - GENERAL", "PHARMACY COMBINED", "NUCLEAR MEDICINE CHS"], "Respiratory Therapy": [ "RESPIRATORY THERAPY"], "Supplies & DME": [ "RADIOLOGY SUPPLIES - IR", "PHARMACY COMBINED"]}';
		
		var json_costDepartmentNames = $.parseJSON(costDepartmentNames);
		var category = $("#categories  li.active").text();
		//clear the select department options
		//$("#department").empty();
		var costDepartmentNames_category = json_costDepartmentNames[''+category+''];
		var select_check = 0;
		var categories = [];
		//alert(category);
		for (var u = 0; u <= costDepartmentNames_category.length; u++){
			//alert('inside loop');
			//var fetched_row = costDepartmentNames_category[u];
			var fetched_department = costDepartmentNames_category[u];
			//alert(fetched_department);
			categories[u] = fetched_department;
		}	//end of for
				
				var data;
				if (category == "All Categories") {
					data = costDepartments_for_income.allCategories;
				} else if (category == "ICU & CCU" ) {
					data = costDepartments_for_income.ICUCCU;
				} else if (category == "Pharmacy & IV" ) {
					data = costDepartments_for_income.PharmacyIV;
				} else if (category == "Lab & Path" ) {
					data = costDepartments_for_income.LabPath;
				} else if (category == "Blood" ) {
					data = costDepartments_for_income.Blood;
				} else if (category == "OR/Recovery" ) {
					data = costDepartments_for_income.ORRecovery;
				} else if (category == "Imaging" ) {
					data = costDepartments_for_income.Imaging;
				} else if (category == "Respiratory Therapy" ) {
					data = costDepartments_for_income.RespiratoryTherapy;
				} else if (category == "Implants" ) {
					data = costDepartments_for_income.Implants;
				}else if (category == "Med/Surg" ) {
					data = costDepartments_for_income.MedSurg;
				} else if (category == "PT/OT/Speech/Audio" ) {
					data = costDepartments_for_income.PTOTSpeechAudio;
				} else if (category == "Cardiology" ) {
					data = costDepartments_for_income.Cardiology;
				} else if (category == "Supplies & DME" ) {
					data = costDepartments_for_income.SuppliesDME;
				} else if (category == "Other" ) {
					data = costDepartments_for_income.Other;
				} 
				
				//alert(costDepartments.allCategories.department);
				
				$('#netIncomeContainer').highcharts({
					chart: {
						type: 'bar'
					},
					title: {
						text: ''
					},
					xAxis: {
						categories: categories//['Radiology Diagnostic','Raidiology MRI', 'Radiology CT', 'Radiology IR']
					},            
					yAxis: {
						title: {
							text: 'Income'
						},
						labels: {
							formatter: function() {
								return '$' + Highcharts.numberFormat(this.value, 0 );
							}
						}
					},
					tooltip: {
						formatter: function() {
							return  this.x +'<br/>'+
								'<font color="blue">Net Income:</font> <b>$ '+ Highcharts.numberFormat(this.y, 0) + '</b>';
						}
					},
					colors: [
					'#41DB04'
					],
					credits: {
						enabled: false
					},
					series: [{
						name: 'Net Income',
						data: data //[572, 306, {y:-62, color: 'red'} , {y:-1259, color: 'red'}]
					,
					showInLegend: false
					}]
				});
			}//end of udate_piechart() function
    
			update_income_chart();
			
			$("#categories li").click(function() {
				update_income_chart();
			});
		
		//alert(data);
		
});