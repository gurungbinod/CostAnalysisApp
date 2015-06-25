
$(function(){

//change number format
$.fn.digits = function(){ 
		return this.each(function(){ 
			$(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
		})
	}

$html_loader = {
		loadDefault:function () {
			$("#facility_cancer").show();
			//alert($(".rangeval").html());
			$html_loader.loadCostCategory();
			$html_loader.setOverAllTotalCost();
			$html_loader.setOverAllNetIncome();
			$html_loader.loadSubDivisions();
			$.getJSON("patients_sample.json", function(data) {
			var patientsData = data.patients;
			//alert(patientsData);
			//loadPatientTable(patientsData);
			$html_loader.loadPatientTable(patientsData);
			//$html_loader.loadPatientInfo(patientsData);
			$(".cost-number").digits();
			
			$.getJSON("cost_breakdown_category.json",function(data){
				var costDepartmentByCategory = data.cost_category;
				//alert(costDepartmentByCategory);
				var pieChartData = $html_loader.getPieChartData(costDepartmentByCategory);
				//console.log(pieChartData);
				$html_loader.loadPieChart(pieChartData, 'Cost Home','');
				$html_loader.loadCostTable(costDepartmentByCategory);
			});
			
			});
		},
		loadDefault_fromCookie:function () {
			$html_loader.setOverAllTotalCost();
			$html_loader.setOverAllNetIncome();
			//$("#facility_cancer").show();
		//	alert($.cookie('rangeval'));
			var population = $.cookie('population');
			$html_loader.setPopulationName(population);	
			if (population == 'Population') {
				$("#facility_cancer").show();
				var falicity_level = $.cookie('population_facility');
				var population_cancer_level = $.cookie('population_cancer');
				//set levels
				//alert(falicity_level+' '+population_cancer_level);
				$(".facility_level").text(falicity_level);
				$(".population_cancer_level").text(population_cancer_level);
				$html_loader.loadSubDivisionForPopulation_fromCookie(falicity_level,population_cancer_level);
				
			} else if (population == 'Patient Cohorts') {
				$("#patient_cohorts").show();
				var gender_level = $.cookie('cohort_gender');
				var cancer_level = $.cookie('cohort_cancer');
				var race_level = $.cookie('cohort_race');
				var stage_level = $.cookie('cohort_stage');
				var rangeval = $.cookie('rangeval');
				var rangeval_from = $.cookie('rangeval_from');
				var rangeval_to = $.cookie('rangeval_to');
				//alert(gender_level+' '+cancer_level);
				//set levels
				$(".gender_level").text(gender_level);
				$(".cancer_level").text(cancer_level);
				$(".race_level").text(race_level);
				$(".stage_level").text(stage_level);
				$(".rangeval_level").text(rangeval);
				
				$html_loader.loadSubDivisionForCohort_fromCookie(gender_level,race_level,cancer_level,stage_level,rangeval_from,rangeval_to);
				
			} else if (population == 'Individual Patient') {
				$("#individual_patient").show();
				var patient_name = $.cookie('patient_name');
				//set levels
				$("#patientName").text(patient_name);
			}
			
			$html_loader.loadCostCategory();
			//$html_loader.setOverAllTotalCost();
			//$html_loader.setOverAllNetIncome();
			//$html_loader.loadSubDivisions();
			//now update the barchart and income table as per the income level cookie is set
			var department =$.cookie('department');
			var category = $.cookie('category');
			var sub_department = $.cookie('sub_department');
			//alert('department='+department+' category = '+category+'current selection = '+sub_department);
			if (department == '') {
				$(".overall_cost_wrap").css('float','right');
				//if no department is selected then check for the category
				if (category == '') {
					//if no category is selected
					var title = "of Care";
					var inlevel = "Cost Category";
					//alert(title, inlevel);
					$html_loader.updatePieChartInfo(title,inlevel,'category');
					var thead = "<tr><th>Cost Category</th>th>Directed Cost</th><th>Indirected Cost</th><th>Total Cost</th></tr>";
					$("#cost-data thead").html(thead);
					$html_loader.updateCostTable('category');
					/*$html_loader.updateBarChartInfo_fromBar(title,inlevel,'department',category);
					var thead = "<tr><th>Income Department</th><th>Total Income</th</tr>";
					$("#cost-data thead").html(thead);
					$html_loader.updateIncomeTable_fromBar('department',category);*/
				} else {
					//if a category is selected
					var title = "in "+category;
					var inlevel = "Cost Department";
					//alert(title, inlevel);
					
					$html_loader.updatePieChartInfo_fromPie(title,inlevel,'department',category);
					var thead = "<tr><th>Cost Department</th><th>Directed Cost</th><th>Indirected Cost</th><th>Total Cost</th></tr>";
					$("#cost-data thead").html(thead);
					$html_loader.updateCostTable_fromPie('department',category);
					/*$html_loader.updateBarChartInfo_fromBar(title,inlevel,'sub_department',department);
					var thead = "<tr><th>Income Sub Department</th><th>Total Cost</th</tr>";
					$("#cost-data thead").html(thead);
					$html_loader.updateIncomeTable_fromBar('sub_department',department);*/
					
				}
			} else {
				if (sub_department != '') {
					//there is some department selected
					$("#categoryName").text(category);
					$("#departmentName").text(department);
					$("#subDepartmentName").html(sub_department);
					
					$(".cost_department").show();
					$(".cost_sub_department").show();
					$(".cost_category").show();
					
					$("#chart-cost-data").hide();
					$(".overall_cost_wrap").css('float','left');
				} else {
					$("#categoryName").text(category);
					$("#departmentName").text(department);
					$(".cost_department").show();
					var title = "in "+department;
					var inlevel = "Cost Sub Department";
					//alert(title+' '+inlevel+'   test');
					$html_loader.updatePieChartInfo_fromPie(title,inlevel,'sub_department',department);
					var thead = "<tr><th>Cost Sub Department</th><th>Directed Cost</th><th>Indirected Cost</th><th>Total Cost</th></tr>";
					$("#cost-data thead").html(thead);
					$html_loader.updateCostTable_fromPie('sub_department',department);
					
					//load departments
					$.getJSON("cost_breakdown_department.json",function(data){
						var costDepartmentByCategory = data.cost_category[category];
						//alert(incomeDepartmentByCategory);
						var pieChartData = $html_loader.getPieChartData(costDepartmentByCategory);
						//console.log(barChartData);
						$html_loader.loadPieChart(pieChartData, 'Cost Home');
						//$html_loader.loadIncomeTable(incomeDepartmentByCategory);
						
						//load income department
						var list = "<h6 class='list-heading'>Select a Income Department</h6>";
						$.each(costDepartmentByCategory,function(i,v){
							var items = v['name'];
							list += "<li>"+items+"</li>";
							});
						$("ul.cost_department_ul").html(list);
						$("#categoryName").html(category);
						$(".cost_department").show();
					});
				}
			}
			if (population != 'Individual Patient') {
				$html_loader.updatePatientTable_fromCookie();//update patient table
			} else {
				//$html_loader.updatePatientTable_fromCookie();//update patient table
				$("#patient-table").hide();
			}
			
			
			//$("#age_range").slider('option', { values: [rangeval_from, rangeval_to] });
			//destroy cookie when everything is loaded successfully
			//$html_loader.destroy_cookie();
		},
		loadSubDivisionForPopulation_fromCookie: function (facility,cancer) {
			//console.log('load sub division for population');
			//alert('');
			$.getJSON("costAnaylsis_metadata.json",function(data){
				var choices_facility = data.choices_facility;
				var choices_cancer = data.choices_cancer;
				//alert(choices_facility);
				var facilityoption = "",
					canceroption = "";
				$.each(choices_facility,function(k,v){
					var selected="";
					if (facility == v) {
						selected = "selected"
					}
					facilityoption +="<option "+selected+">"+v+"</option>";
					});
					//alert(facilityoption);
				$.each(choices_cancer,function(k,v){
					var selected="";
					if (cancer == v) {
						selected = "selected"
					}
					canceroption +="<option "+selected+">"+v+"</option>";
					});
				
				//alert(facilityoption);
				$("#population_facility").html(facilityoption);
				$("#population_cancer").html(canceroption);
				
				//set the default levels to the subdivisions
				/*$(".facility_level").text('All Hospital');
				$(".population_cancer_level").text('All Cancer');*/
				
			});
		},
		loadSubDivisionForCohort_fromCookie: function(gender, race, cancer, stage, age_from, age_to) {
			//console.log('load sub division for cohort');
			//alert('entered');
			
			$.getJSON("costAnaylsis_metadata.json",function(data){
				var choices_gender = data.choices_gender;
				var choices_race = data.choices_race;
				var choices_stage = data.choices_stage;
				var choices_cancer_site = data.choices_cancer_site;
				
				var genderoption = "",
					raceoption = "",
					stageoption = "",
					ageoption = "",
					cancer_siteoption =  "";
				//alert('inside the json');	
				$.each(choices_cancer_site,function(k,v){
					var selected="";
					if (cancer == v) {
						selected = "selected"
					}
					cancer_siteoption +="<option "+selected+">"+v+"</option>";
					console.log(cancer_siteoption);
					});
					$("#cohort_cancer").html(cancer_siteoption);
					//alert(cancer_siteoption);
				$.each(choices_gender,function(k,v){
					var selected="";
					if (gender == v) {
						selected = "selected"
					}
					genderoption +="<option "+selected+">"+v+"</option>";
					console.log(genderoption);
					});
					//alert(choices_gender);
					$("#cohort_gender").html(genderoption);
				$.each(choices_race,function(k,v){
					var selected="";
					if (race == v) {
						selected = "selected"
					}
					raceoption +="<option "+selected+">"+v+"</option>";
					console.log(raceoption);
					});
					//alert(raceoption);
					$("#cohort_race").html(raceoption);
				$.each(choices_stage,function(k,v){
					var selected="";
					if (stages == v) {
						selected = "selected"
					}
					stageoption +="<option "+selected+">"+v+"</option>";
					console.log(stageoption);
					});
					$("#cohort_stage").html(stageoption);
				
				//$("#cohort_age").html(ageoption);
				//set the default levels to the subdivisions
				/*$(".cancer_level").text('Any');
				$(".stage_level").text('Any');
				$(".race_level").text('Any');
				$(".gender_level").text('Any');
				$(".rangeval").text('0-116');*/
				
			});
		},
		updatePatientTable_fromCookie: function() {
			var tbody="";
			var population_facility = $(".facility_level").text().toLowerCase();
			var population_cancer = $(".population_cancer_level").text().toLowerCase();
			//alert(population_facility+' '+population_cancer)
			
			var cohort_cancer = $(".cancer_level").text().toLowerCase();
			var cohort_gender = $(".gender_level").text();
			var cohort_race = $(".race_level").text().toLowerCase();
			var cohort_stage = $(".stage_level").text();
			var cohort_age_from = $.cookie('rangeval_from');
			var cohort_age_to = $.cookie('rangeval_to');
			/*var condition = cohort_age_from +"<"+ v['age'] +"&&"+ v['age']+"<"+cohort_age_to;
			
			alert(cohort_cancer+' '+cohort_age_to);*/
			$.getJSON("patients_sample.json", function(data) {
			var patientsData = data.patients;
			$.each(patientsData, function(k,v){
					var condition = "";
					var flag = true;
					if ($("#populationName").text() == "Patient Cohorts") {
						if (!(v['age']>=cohort_age_from && v['age']<=cohort_age_to)) {
							flag = false;
						}
						if (cohort_gender != "Any") {
							if (v['gender'] != cohort_gender) {
								flag = false;
							}
						}
						if (cohort_race != "any") {
							if (v['race'] != cohort_race) {
								flag = false;
							}
						}
						if (cohort_stage != "Any") {
							if (v['stage'] != cohort_stage) {
								flag = false;
							}
						}
						if (cohort_cancer != "any") {
							if (v['cancer'] != cohort_cancer) {
								flag = false;
							}
						}
					}
					if ($("#populationName").text() == "Population") {
						if (population_facility != "all hospital") {
							if (v['hospital'] != population_facility) {
								flag = false;
							}
						}
						if (population_cancer != "all cancer") {
							if (v['cancer']!= population_cancer) {
								flag = false;
							}
						}
					}
					if (flag) {
					tbody += "<tr data-id='"+v['id']+"'><td class='patient-name'>"+v['name']+"</td><td style='text-align: center;'>"+v['age']+"</td><td>"+v['gender']+"</td><td>"+v['race']+"</td><td>"+v['cancer']+"</td><td>"+v['stage']+"</td><td style='position:relative;padding-left:10px; text-align:right;' class='digits'>"+parseInt(v['cost'])+"</td></tr>";
					}
				});
				//alert(tbody);
				//replace the current table body with the new one
				//$("#patient-table tbody").empty();
				$('#patient-table').dataTable().fnDestroy();
				$("#patient-table tbody").html(tbody);
				var patientTable =$('#patient-table').dataTable().columnFilter();
				  // Sort immediately with columns 0 and 1
				  patientTable.fnSort( [ [6,'desc'] ] );
				$("#patient-table").show();
				$(".digits").digits();
				$(".cost-number").digits();
				$("#patient-table").css("width","100%");
			});
			
		},
		setCookie_facility: function() {
			$.cookie('population_facility', $(".facility_level").text());
			$.cookie('population_cancer', $(".population_cancer_level").text());
		},
		setCookie_cohort: function() {
			$.cookie('cohort_gender', $(".gender_level").text());
			$.cookie('cohort_cancer', $(".cancer_level").text());
			$.cookie('cohort_race', $(".race_level").text());
			$.cookie('cohort_stage', $(".stage_level").text());
			$.cookie('rangeval', $(".rangeval_level").html());
			$.cookie('rangeval_from', $( "#age_range" ).slider( "values", 0 ));
			$.cookie('rangeval_to', $( "#age_range" ).slider( "values", 1 ));
		},
		setCookie_individual: function() {
			$.cookie('patient_name', $("#patientName").text());
			//$.cookie('population_cancer', $("#population_cancer").val());
		},
		setCookie_structure: function() {
			$.cookie('category', $("#categoryName").text());
			$.cookie('department', $("#departmentName").text());
			$.cookie('sub_department', $("#subDepartmentName").text());
		},
		removeCookie_structure: function() {
			$.removeCookie('category');
			$.removeCookie('department');
			$.removeCookie('sub_department');
		},
		removeCookie_facility: function() {
			$.removeCookie('population_facility');
			$.removeCookie('population_cancer');
		},
		removeCookie_cohort: function() {
			$.removeCookie('cohort_gender');
			$.removeCookie('cohort_cancer');
			$.removeCookie('cohort_race');
			$.removeCookie('cohort_stage');
			$.removeCookie('rangeval');
		},
		removeCookie_individual: function() {
			$.removeCookie('patient_name');
		},
		destroy_cookie: function() {/*
			$html_loader.removeCookie_cohort();
			$html_loader.removeCookie_facility();
			$html_loader.removeCookie_individual();*/
			$.removeCookie('population');
		},
        //update pie chart info
		updatePieChartInfo: function(title,inlevel,cost_level) {
			$("#cost-in-level").html(title);
			$("#by-level").html(inlevel);
			$("#chart-cost-data").show();
			//alert(cost_level);
			if (cost_level == 'category') {
				$.getJSON("cost_breakdown_category.json",function(data){
					var costDepartmentByCategory = data.cost_category;
					//alert(costDepartmentByCategory);
					var pieChartData = $html_loader.getPieChartData(costDepartmentByCategory);
					//console.log(pieChartData);
					$html_loader.loadPieChart(pieChartData, 'Cost Home','');
					//$html_loader.loadCostTable(costDepartmentByCategory);
				});
			}
			if (cost_level == 'department') {
				var category = $("#categoryName").text();
				$.getJSON("cost_breakdown_department.json",function(data){
					var costDepartmentByCategory = data.cost_category[category];
					//alert(costDepartmentByCategory);
					var pieChartData = $html_loader.getPieChartData(costDepartmentByCategory);
					//console.log(pieChartData);
					$html_loader.loadPieChart(pieChartData, 'Cost Home','');
					//$html_loader.loadCostTable(costDepartmentByCategory);
				});
			}
			if (cost_level == 'sub_department') {
				var category = $("#categoryName").text();
				var department = $("#departmentName").text();
				$.getJSON("cost_breakdown_sub_department.json",function(data){
					//alert(data);
					var costDepartmentByCategory = data.cost_structure[category][department];
					//alert(costDepartmentByCategory);
					var pieChartData = $html_loader.getPieChartData(costDepartmentByCategory);
					//console.log(pieChartData);
					$html_loader.loadPieChart(pieChartData, 'Cost Home','');
					//$html_loader.loadCostTable(costDepartmentByCategory);
				});
			}
			/*$.getJSON("cost_breakdown.json",function(data){
				var costDepartmentByCategory = data.breakdown;
				//alert(costDepartmentByCategory);
				var pieChartData = $html_loader.getPieChartData(costDepartmentByCategory);
				//console.log(pieChartData);
				$html_loader.loadPieChart(pieChartData, 'Cost Home','');
				//$html_loader.loadCostTable(costDepartmentByCategory);
			});*/
			
		},
        //update pie chart info
		updatePieChartInfo_fromPie: function(title,inlevel,cost_level, level_value) {
			$("#cost-in-level").html(title);
			$("#by-level").html(inlevel);
			$("#chart-cost-data").show();
			/*
			//alert(cost_level);
			if (cost_level == 'category') {
				$.getJSON("cost_breakdown_category.json",function(data){
					var costDepartmentByCategory = data.cost_category;
					//alert(costDepartmentByCategory);
					var pieChartData = $html_loader.getPieChartData(costDepartmentByCategory);
					//console.log(pieChartData);
					$html_loader.loadPieChart(pieChartData, 'Cost Home','');
					//$html_loader.loadCostTable(costDepartmentByCategory);
				});
			}*/
			//alert(level_value);
			if (cost_level == 'department') {
				var category = level_value;
				$.getJSON("cost_breakdown_department.json",function(data){
					var costDepartmentByCategory = data.cost_category[category];
					//alert(costDepartmentByCategory);
					var pieChartData = $html_loader.getPieChartData(costDepartmentByCategory);
					//console.log(pieChartData);
					$html_loader.loadPieChart(pieChartData, 'Cost Home','');
					//$html_loader.loadCostTable(costDepartmentByCategory);
					
					//load cost department
					var list = "<h6 class='list-heading'>Select a Cost Department</h6>";
					$.each(costDepartmentByCategory,function(i,v){
						var items = v['name'];
						list += "<li>"+items+"</li>";
						});
					$("ul.cost_department_ul").html(list);
					$("#categoryName").html(category);
	 			    $(".cost_department").show();
				});
			}
			if (cost_level == 'sub_department') {
				var category = $("#categoryName").text();
				var department = level_value;
				$.getJSON("cost_breakdown_sub_department.json",function(data){
					var costDepartmentByCategory = data.cost_structure[category][department];
					//alert(costDepartmentByCategory);
					var pieChartData = $html_loader.getPieChartData(costDepartmentByCategory);
					//console.log(pieChartData);
					$html_loader.loadPieChart(pieChartData, 'Cost Home','');
					//$html_loader.loadCostTable(costDepartmentByCategory);
					
					//load sub department
					var list = "<h6 class='list-heading'>Select Sub Department</h6>";
					$.each(costDepartmentByCategory,function(i,v){
						var items = v['name'];
						list += "<li>"+items+"</li>";
						//alert(list);
						});
						//alert(list);
					$("ul.cost_sub_department_ul").html(list);
					$("#departmentName").html(department);
					$(".cost_sub_department").show();
				});
			}
			/*$.getJSON("cost_breakdown.json",function(data){
				var costDepartmentByCategory = data.breakdown;
				//alert(costDepartmentByCategory);
				var pieChartData = $html_loader.getPieChartData(costDepartmentByCategory);
				//console.log(pieChartData);
				$html_loader.loadPieChart(pieChartData, 'Cost Home','');
				//$html_loader.loadCostTable(costDepartmentByCategory);
			});*/
			
		},
		updateCostTable_fromPie: function(cost_level,level_value) {
			/*if (cost_level == 'category') {
				$.getJSON("cost_breakdown_category.json",function(data){
				var costDepartmentByCategory = data.cost_category;
				$html_loader.loadCostTable(costDepartmentByCategory);
				});
			}*/
			if (cost_level == 'department') {
				var category = level_value;
				$.getJSON("cost_breakdown_department.json",function(data){
				var costDepartmentByCategory = data.cost_category[category];
				//alert(costDepartmentByCategory);
				$html_loader.loadCostTable(costDepartmentByCategory);
				});
			}
			if (cost_level == 'sub_department') {
				var category = $("#categoryName").text();
				var department = level_value;
				$.getJSON("cost_breakdown_sub_department.json",function(data){
				var costDepartmentByCategory = data.cost_structure[category][department];
				//alert(costDepartmentByCategory);
				$html_loader.loadCostTable(costDepartmentByCategory);
				});
			}
		},
		updateCostTable: function(cost_level) {
			if (cost_level == 'category') {
				$.getJSON("cost_breakdown_category.json",function(data){
				var costDepartmentByCategory = data.cost_category;
				var thead = "<tr><th>Cost Categories</th><th>Direct Cost</th><th>Indirect Cost</th><th>Total Cost</th</tr>";
				$("#cost-data thead").html(thead);
				$html_loader.loadCostTable(costDepartmentByCategory);
				});
			}
			if (cost_level == 'department') {
				var category = $("#categoryName").text();
				$.getJSON("cost_breakdown_department.json",function(data){
				var costDepartmentByCategory = data.cost_category[category];
				//alert(costDepartmentByCategory);
				var thead = "<tr><th>Cost Department</th><th>Direct Cost</th><th>Indirect Cost</th><th>Total Cost</th</tr>";
				$("#cost-data thead").html(thead);
				$html_loader.loadCostTable(costDepartmentByCategory);
				});
			}
			if (cost_level == 'sub_department') {
				var category = $("#categoryName").text();
				var department = $("#departmentName").text();
				$.getJSON("cost_breakdown_sub_department.json",function(data){
				var costDepartmentByCategory = data.cost_structure[category][department];
				//alert(costDepartmentByCategory);
				var thead = "<tr><th>Cost Sub Department</th><th>Direct Cost</th><th>Indirect Cost</th><th>Total Cost</th</tr>";
				$("#cost-data thead").html(thead);
				$html_loader.loadCostTable(costDepartmentByCategory);
				});
			}
		},
		loadPatientTable: function(patientData) {
			var tbody="";
			$.each(patientData, function(k,v){
				tbody += "<tr data-id='"+v['id']+"'><td class='patient-name'>"+v['name']+"</td><td style='text-align: center;'>"+v['age']+"</td><td>"+v['gender']+"</td><td>"+v['race']+"</td><td>"+v['cancer']+"</td><td>"+v['stage']+"</td><td style='position:relative; padding-left:10px; text-align:right;' class='digits'>"+parseInt(v['cost'])+"</td>></tr>";
				});
			//replace the current table body with the new one
			$('#patient-table').dataTable().fnDestroy();
			$("#patient-table tbody").html(tbody);
			var patientTable =$('#patient-table').dataTable().columnFilter();
			  // Sort immediately with columns 0 and 1
			  patientTable.fnSort( [ [6,'desc'] ] );
			$("#patient-table").show();
			$("#patient-table").css("width","100%");
			$(".digits").digits();
		},
		loadPatientInfo: function(patientData) {
			var tbody="";
			$.each(patientData, function(k,v){
				tbody += "<tr data-id='"+v['id']+"'><td class='patient-name'>"+v['name']+"</td><td style='text-align: center;'>"+v['age']+"</td><td>"+v['gender']+"</td><td>"+v['race']+"</td><td>"+v['cancer']+"</td><td>"+v['stage']+"</td><td style='position:relative; padding-left:10px; text-align:right;' class='digits'>"+parseInt(v['cost'])+"</td>></tr>";
				});
			//replace the current table body with the new one
			$('#patient-info-table').dataTable().fnDestroy();
			$("#patient-info-table tbody").html(tbody);
			var patientTable =$('#patient-info-table').dataTable().columnFilter();
			  // Sort immediately with columns 0 and 1
			  patientTable.fnSort( [ [6,'desc'] ] );
			//$("#patient-table").show();
			$(".digits").digits();
			$("#patient-info-table").css("width","100%");
		},
		
		updatePatientTable: function() {
			var tbody="";
			
			var population_facility = $("#population_facility").val().toLowerCase();
			var population_cancer = $("#population_cancer").val().toLowerCase();
			
			var cohort_age_from = $( "#age_range" ).slider( "values", 0 );
			var cohort_age_to = $( "#age_range" ).slider( "values", 1 );
			
			var cohort_cancer = $("#cohort_cancer").val().toLowerCase();
			//alert(cohort_cancer);
			var cohort_age_from = $( "#age_range" ).slider( "values", 0 );
			var cohort_age_to = $( "#age_range" ).slider( "values", 1 );
			var cohort_gender = $("#cohort_gender").val();
			var cohort_race = $("#cohort_race").val().toLowerCase();
			var cohort_stage = $("#cohort_stage").val();
			//var condition = cohort_age_from +"<"+ v['age'] +"&&"+ v['age']+"<"+cohort_age_to;
			
			//alert(cohort_cancer+' '+cohort_age_to);
			$.getJSON("patients_sample.json", function(data) {
			var patientsData = data.patients;
			$.each(patientsData, function(k,v){
					var condition = "";
					var flag = true;
					if ($("#populationName").text() == "Patient Cohorts") {
						if (!(v['age']>=cohort_age_from && v['age']<=cohort_age_to)) {
							flag = false;
						}
						if (cohort_gender != "Any") {
							if (v['gender'] != cohort_gender) {
								flag = false;
							}
						}
						if (cohort_race != "any") {
							if (v['race'] != cohort_race) {
								flag = false;
							}
						}
						if (cohort_stage != "Any") {
							if (v['stage'] != cohort_stage) {
								flag = false;
							}
						}
						if (cohort_cancer != "any") {
							if (v['cancer'] != cohort_cancer) {
								flag = false;
							}
						}
					}
					if ($("#populationName").text() == "Population") {
						if (population_facility != "all hospital") {
							if (v['hospital'] != population_facility) {
								flag = false;
							}
						}
						if (population_cancer != "all cancer") {
							if (v['cancer']!= population_cancer) {
								flag = false;
							}
						}
					}
					if (flag) {
					tbody += "<tr data-id='"+v['id']+"'><td class='patient-name'>"+v['name']+"</td><td style='text-align: center;'>"+v['age']+"</td><td>"+v['gender']+"</td><td>"+v['race']+"</td><td>"+v['cancer']+"</td><td>"+v['stage']+"</td><td style='position:relative;padding-left:10px; text-align:right;' class='digits'>"+parseInt(v['cost'])+"</td></tr>";
					}
				});
				//alert(tbody);
				//replace the current table body with the new one
				//$("#patient-table tbody").empty();
				$('#patient-table').dataTable().fnDestroy();
				$("#patient-table tbody").html(tbody);
				var patientTable =$('#patient-table').dataTable().columnFilter();
				  // Sort immediately with columns 0 and 1
				  patientTable.fnSort( [ [6,'desc'] ] );
				$("#patient-table").show();
				$(".digits").digits();
				$("#patient-table").css("width","100%");
			});
			
		},
		loadSubDivisionForPopulation: function() {
			console.log('load sub division for population');
			$.getJSON("costAnaylsis_metadata.json",function(data){
				var choices_facility = data.choices_facility;
				var choices_cancer = data.choices_cancer;
				
				var facilityoption = "",
					canceroption = "";
				$.each(choices_facility,function(k,v){
					facilityoption +="<option>"+v+"</option>";
					});
				$.each(choices_cancer,function(k,v){
					canceroption +="<option>"+v+"</option>";
					});
				
				$("#population_facility").html(facilityoption);
				$("#population_cancer").html(canceroption);
				
				//set the default levels to the subdivisions
				$(".facility_level").text('All Hospital');
				$(".population_cancer_level").text('All Cancer');
				
			});
		},
		loadSubDivisionForCohort: function() {
			console.log('load sub division for cohort');
			$.getJSON("costAnaylsis_metadata.json",function(data){
				var choices_gender = data.choices_gender;
				var choices_race = data.choices_race;
				var choices_stage = data.choices_stage;
				var choices_cancer_site = data.choices_cancer_site;
				
				var genderoption = "",
					raceoption = "",
					stageoption = "",
					ageoption = "<option>Any</option>",
					cancer_siteoption =  "";
					
				$.each(choices_cancer_site,function(k,v){
					cancer_siteoption +="<option>"+v+"</option>";
					});
				$.each(choices_gender,function(k,v){
					genderoption +="<option>"+v+"</option>";
					});
				$.each(choices_race,function(k,v){
					raceoption +="<option>"+v+"</option>";
					});
				$.each(choices_stage,function(k,v){
					stageoption +="<option>"+v+"</option>";
					});
				for (var i = 0; i<=116 ; i++) {
					ageoption +="<option>"+i+"</option>";
				}
				
				$("#cohort_race").html(raceoption);
				$("#cohort_gender").html(genderoption);
				$("#cohort_cancer").html(cancer_siteoption);
				$("#cohort_stage").html(stageoption);
				$("#cohort_age").html(ageoption);
				
				//set the default levels to the subdivisions
				$(".cancer_level").text('Any');
				$(".stage_level").text('Any');
				$(".race_level").text('Any');
				$(".gender_level").text('Any');
				$(".rangeval").text('0-116');
				
			});
		},
		loadSubDivisions: function() {
			console.log('load sub divisions');
			$html_loader.loadSubDivisionForPopulation();
			$html_loader.loadSubDivisionForCohort();
		},
		loadCostCategory: function() {
			$.getJSON("cost_breakdown_category.json",function(data){
				var category = data.cost_category;
				//alert(costDepartmentByCategory);
				var list = "<h6 class='list-heading'>Select a Cost Category</h6>";
				$.each(category,function(k,v){
					list +="<li>"+v['name']+"</li>";
					});
				$(".cost_categories ul.sublist").html(list);
			});
		},
		loadCostDepartment: function(costCategory) {
			var category = costCategory;
			if (category!='All Category') {
				$.getJSON('cost_breakdown_department.json', function(data) {
						var cost_category = data.cost_category[category];
						var list = "<h6 class='list-heading'>Select a Cost Department</h6>";
						$.each(cost_category,function(i,v){
							var items = v['name'];
							list += "<li>"+items+"</li>";
							});
						$("ul.cost_department_ul").html(list);
				  });
				  $("#categoryName").html(category);
				  $(".cost_department").show();
			} else {
				$(".cost_department").hide();
				$("#categoryName").html('');
			}
			$(".cost_sub_department").hide();
			$("#subDepartmentName").html('');
			$("#departmentName").html('');
			
			var title = "in "+category+"";
			if (category == "All Category") {
				title = 'of Care';
			}
			var inlevel = "Cost Department";
			$html_loader.updatePieChartInfo(title,inlevel,'department');
			$html_loader.updatePatientTable();
			$html_loader.updateCostTable('department');
		},
		setOverAllTotalCost: function() {
			$.getJSON("cost_breakdown_category.json",function(data){
				var breakdown = data.cost_category;
				var total = 0;
				$.each(breakdown,function(k,v){
					total+=parseInt(v['cost']);
					});
				$("#overall_total_cost").html('$<span class=\'cost-number\'>'+total+'</span>');
				$(".cost-number").digits();
			});
		},
		setOverAllNetIncome: function() {
			$.getJSON("income_breakdown.json",function(data){
				var breakdown = data.breakdown;
				var total = 0;
				$.each(breakdown,function(k,v){
					total+=parseInt(v['income']);
					});
				$("#overall_total_income").html('$<span class=\'cost-number\'>'+total+'</span>');
				$(".cost-number").digits();
			});
		},
		loadCostTable: function(costData) {
			var tbody="";
			$.each(costData, function(k,v){
				tbody += "<tr><td class='level'>"+v['name']+"</td><td style='position:relative; text-align: right;'><span class='digits'>"+parseInt(v['directed_cost'])+"</span></td><td style='position:relative; text-align: right;'><span class='digits'>"+parseInt(v['indirected_cost'])+"<span></td><td style='position:relative; text-align: right;'><span class='digits'>"+parseInt(v['cost'])+"</span></td></tr>";
				});
			//replace the current table body with the new one
			$("#cost-data tbody").html(tbody);
			$(".digits").digits();
		},
		getPieChartData: function(costDepartmentByCategory) {
				var pieChartData = [];
				var departmentCount = 0;
				$.each(costDepartmentByCategory, function(k, v) {
					var pieChartContent = [];
					pieChartContent = [v['name'], parseInt(v['cost'])];
					pieChartData[departmentCount] = pieChartContent;
					
					departmentCount++;
				});
				return pieChartData;
	
			},
		
		loadPieChart: function(data, category, theTitle) {
				$('.piechart').highcharts({
					chart: {
						plotBackgroundColor: null,
						plotBorderWidth: null,
						plotShadow: false
					},       
					title: {
						text: theTitle
					},
					tooltip: {
			formatter: function() {
				return  '<span style="color:' + this.point.color + '">' + this.point.name +'</span><br/>'+
					'Cost: <b>$ '+ Highcharts.numberFormat(this.y, 0) + '</b> (' + Highcharts.numberFormat(this.percentage, 1) + '%)';
			}
					},
					plotOptions: {
						pie: {
							size:'80%',
							allowPointSelect: true,
							cursor: 'pointer',
							dataLabels: {
								enabled: true,
								color: '#000000',
								style:{fontSize: '8px', fontWeight:'normal'},
								connectorColor: '#000000',
					formatter: function() {
						return '<span style="color:' + this.point.color + '; font-weight:bold;">' + this.point.name + '</span>: <b>$' + Highcharts.numberFormat(this.y, 0 ) + "</b>";
					}
							}
						}
					},
					credits: {
						enabled: false
					},
					exporting: {
							 enabled: false
					},
					series: [{
							type: 'pie',
							name: 'Over All Cost',
							data: data,
							point:{
								events:{
									click: function (event) {
										var department = $("#departmentName").text();
										var category = $("#categoryName").text();
										var current_selection = this.name;
										//alert('department='+department+' category = '+category+'current selection = '+current_selection);
										if (department == '') {
											$(".overall_cost_wrap").css('float','right');
											//if no department is selected then check for the category
											if (category == '') {
												//if no category is selected
												var title = "in "+this.name;
												var inlevel = "Cost Department";
												//alert(title);
												$html_loader.updatePieChartInfo_fromPie(title, inlevel, 'department', this.name);
												
												var thead = "<tr><th>Cost Department</th><th>Direct Cost</th><th>Indirect Cost</th><th>Total Cost</th</tr>";
												$("#cost-data thead").html(thead);
												$html_loader.updateCostTable_fromPie('department', this.name);
												
											} else {
												//if a category is selected
												var title = "in "+this.name;
												var inlevel = "Cost Sub Department";
												//alert(title);
												$html_loader.updatePieChartInfo_fromPie(title, inlevel, 'sub_department', this.name);
												var thead = "<tr><th>Cost Sub Department</th><th>Direct Cost</th><th>Indirect Cost</th><th>Total Cost</th</tr>";
				$("#cost-data thead").html(thead);
												$html_loader.updateCostTable_fromPie('sub_department', this.name);
											}
										} else {
											//there is some department selected
											$("#subDepartmentName").html(this.name);
											$("#chart-cost-data").hide();
											$(".overall_cost_wrap").css('float','left');
										}
									  //$html_loader.updatePieChartInfo(this.name, 'Cost Department');
									}
								}
							} ,
						}]
				});
			},
			setPopulationName: function(name) {
				$("#populationName").html(name);
			},
			getPopulationName: function() {
				return $("#populationName").text();
			},
			setPatientName: function(name) {
				$("#patientName").html(name);
			},
			getPatientName: function() {
				return $("#patientName").text();
			},
		loadIndividualPatient: function(id, name) {
			$(".subdivision").hide();
			$("#individual_patient").show();
			$("#patientName").text(name);
			$("#patient-table").hide();
			$('#patient-table').dataTable().fnDestroy();
			$html_loader.setPopulationName('Individual Patient');
		}

}	



});