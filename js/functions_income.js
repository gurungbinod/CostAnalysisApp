
$(function(){

//change number format
$.fn.digits = function(){ 
		return this.each(function(){ 
			$(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
		})
	}

$html_loader_forIncome = {
		loadDefault:function () {
			$("#facility_cancer").show();
			$html_loader_forIncome.loadIncomeCategory();
			$html_loader_forIncome.setOverAllTotalCost();
			$html_loader_forIncome.setOverAllNetIncome();
			$html_loader_forIncome.loadSubDivisions();
			$.getJSON("patients_sample_income.json", function(data) {
			var patientsData = data.patients;
			//alert(patientsData);
			//loadPatientTable(patientsData);
			$html_loader_forIncome.loadPatientTable(patientsData);
			//$html_loader_forIncome.loadPatientInfo(patientsData);
			
			$(".cost-number").digits();
			
			$.getJSON("income_breakdown_category.json",function(data){
				var incomeDepartmentByCategory = data.income_category;
				var barChartData = $html_loader_forIncome.getBarChartData(incomeDepartmentByCategory);
				//console.log(pieChartData);
				$html_loader_forIncome.loadBarChart(barChartData, 'Income Home');
				$html_loader_forIncome.loadIncomeTable(incomeDepartmentByCategory);
			});
			
			});
		},
		loadDefault_fromCookie:function () {
			$html_loader_forIncome.setOverAllTotalCost();
			$html_loader_forIncome.setOverAllNetIncome();
			$(".cost-number").digits();
			//$("#facility_cancer").show();
		//	alert($.cookie('rangeval'));
			var population = $.cookie('population');
			$html_loader_forIncome.setPopulationName(population);	
			if (population == 'Population') {
				$("#facility_cancer").show();
				var falicity_level = $.cookie('population_facility');
				var population_cancer_level = $.cookie('population_cancer');
				//set levels
				//alert(falicity_level+' '+population_cancer_level);
				$(".facility_level").text(falicity_level);
				$(".population_cancer_level").text(population_cancer_level);
				$html_loader_forIncome.loadSubDivisionForPopulation_fromCookie(falicity_level,population_cancer_level);
				
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
				
				$html_loader_forIncome.loadSubDivisionForCohort_fromCookie(gender_level,race_level,cancer_level,stage_level,rangeval_from,rangeval_to);
				
			} else if (population == 'Individual Patient') {
				$("#individual_patient").show();
				var patient_name = $.cookie('patient_name');
				//set levels
				$("#patientName").text(patient_name);
			}
			
			$html_loader_forIncome.loadIncomeCategory();
			//$html_loader_forIncome.setOverAllTotalCost();
			//$html_loader_forIncome.setOverAllNetIncome();
			//$html_loader_forIncome.loadSubDivisions();
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
					var inlevel = "Income Category";
					//alert(title, inlevel);
					$html_loader_forIncome.updateBarChartInfo(title,inlevel,'category');
					var thead = "<tr><th>Income Category</th><th>Total Income</th></tr>";
					$("#income-data thead").html(thead);
					$html_loader_forIncome.updateIncomeTable('category');
					/*$html_loader_forIncome.updateBarChartInfo_fromBar(title,inlevel,'department',category);
					var thead = "<tr><th>Income Department</th><th>Total Income</th</tr>";
					$("#cost-data thead").html(thead);
					$html_loader_forIncome.updateIncomeTable_fromBar('department',category);*/
				} else {
					//if a category is selected
					var title = "in "+category;
					var inlevel = "Income Department";
					//alert(title, inlevel);
					
					$html_loader_forIncome.updateBarChartInfo_fromBar(title,inlevel,'department',category);
					var thead = "<tr><th>Income Department</th><th>Total Income</th></tr>";
					$("#income-data thead").html(thead);
					$html_loader_forIncome.updateIncomeTable_fromBar('department',category);
					/*$html_loader_forIncome.updateBarChartInfo_fromBar(title,inlevel,'sub_department',department);
					var thead = "<tr><th>Income Sub Department</th><th>Total Cost</th</tr>";
					$("#cost-data thead").html(thead);
					$html_loader_forIncome.updateIncomeTable_fromBar('sub_department',department);*/
					
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
					var inlevel = "Income Sub Department";
					//alert(title+' '+inlevel+'   test');
					$html_loader_forIncome.updateBarChartInfo_fromBar(title,inlevel,'sub_department',department);
					var thead = "<tr><th>Income Sub Department</th><th>Total Income</th></tr>";
					$("#income-data thead").html(thead);
					$html_loader_forIncome.updateIncomeTable_fromBar('sub_department',department);
					
					//load departments
					$.getJSON("income_breakdown_department.json",function(data){
						var incomeDepartmentByCategory = data.income_category[category];
						//alert(incomeDepartmentByCategory);
						var barChartData = $html_loader_forIncome.getBarChartData(incomeDepartmentByCategory);
						//console.log(barChartData);
						$html_loader_forIncome.loadBarChart(barChartData, 'Income Home');
						//$html_loader_forIncome.loadIncomeTable(incomeDepartmentByCategory);
						
						//load income department
						var list = "<h6 class='list-heading'>Select a Income Department</h6>";
						$.each(incomeDepartmentByCategory,function(i,v){
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
				$html_loader_forIncome.updatePatientTable_fromCookie();//update patient table
			} else {
				//$html_loader_forIncome.updatePatientTable_fromCookie();//update patient table
				$("#patient-table").hide();
			}
			$(".cost-number").digits();
			
			//$("#age_range").slider('option', { values: [rangeval_from, rangeval_to] });
			//destroy cookie when everything is loaded successfully
			//$html_loader_forIncome.destroy_cookie();
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
			
			$.removeCookie('rangeval');
			$.removeCookie('rangeval_from');
			$.removeCookie('rangeval_to');
		},
		removeCookie_individual: function() {
			$.removeCookie('patient_name');
		},
		destroy_cookie: function() {
			$.removeCookie('population');
		},
        //update bar chart info
		updateBarChartInfo: function(title,inlevel,income_level) {
			$("#cost-in-level").html(title);
			$("#by-level").html(inlevel);
			$("#chart-cost-data").show();
			//alert(income_level);
			if (income_level == 'category') {
				$.getJSON("income_breakdown_category.json",function(data){
					var incomeDepartmentByCategory = data.income_category;
					//alert(costDepartmentByCategory);
					var barChartData = $html_loader_forIncome.getBarChartData(incomeDepartmentByCategory);
					//console.log(barChartData);
					$html_loader_forIncome.loadBarChart(barChartData, 'Income Home');
					//$html_loader_forIncome.loadIncomeTable(costDepartmentByCategory);
				});
			}
			if (income_level == 'department') {
				var category = $("#categoryName").text();
				$.getJSON("income_breakdown_department.json",function(data){
					var incomeDepartmentByCategory = data.income_category[category];
					//alert(costDepartmentByCategory);
					var barChartData = $html_loader_forIncome.getBarChartData(incomeDepartmentByCategory);
					//console.log(barChartData);
					$html_loader_forIncome.loadBarChart(barChartData, 'Income Home');
					//$html_loader_forIncome.loadIncomeTable(costDepartmentByCategory);
				});
			}
			if (income_level == 'sub_department') {
				//alert('');
				var category = $("#categoryName").text();
				var department = $("#departmentName").text();
				$.getJSON("income_breakdown_sub_department.json",function(data){
					//alert(data);
					var incomeDepartmentByCategory = data.income_structure[category][department];
					//alert(costDepartmentByCategory);
					var barChartData = $html_loader_forIncome.getBarChartData(incomeDepartmentByCategory);
					//console.log(barChartData);
					$html_loader_forIncome.loadBarChart(barChartData, 'Income Home');
					//$html_loader_forIncome.loadIncomeTable(costDepartmentByCategory);
				});
			}
			/*$.getJSON("cost_breakdown.json",function(data){
				var costDepartmentByCategory = data.breakdown;
				//alert(costDepartmentByCategory);
				var barChartData = $html_loader_forIncome.getBarChartData(costDepartmentByCategory);
				//console.log(barChartData);
				$html_loader_forIncome.loadBarChart(barChartData, 'Income Home','');
				//$html_loader_forIncome.loadIncomeTable(costDepartmentByCategory);
			});*/
			
		},
		updateIncomeTable: function(income_level) {
			if (income_level == 'category') {
				$.getJSON("income_breakdown_category.json",function(data){
				var incomeDepartmentByCategory = data.income_category;
				var thead = "<tr><th>Income Categories</th><th>Total Income</th</tr>";
				$("#income-data thead").html(thead);
				$html_loader_forIncome.loadIncomeTable(incomeDepartmentByCategory);
				});
			}
			if (income_level == 'department') {
				var category = $("#categoryName").text();
				$.getJSON("income_breakdown_department.json",function(data){
				var incomeDepartmentByCategory = data.income_category[category];
				//alert(incomeDepartmentByCategory);
				var thead = "<tr><th>Income Department</th><th>Total Income</th</tr>";
				$("#income-data thead").html(thead);
				$html_loader_forIncome.loadIncomeTable(incomeDepartmentByCategory);
				});
			}
			if (income_level == 'sub_department') {
				var category = $("#categoryName").text();
				var department = $("#departmentName").text();
				$.getJSON("income_breakdown_sub_department.json",function(data){
				var incomeDepartmentByCategory = data.income_structure[category][department];
				//alert(incomeDepartmentByCategory);
				var thead = "<tr><th>Income Sub Department</th><th>Total Income</th</tr>";
				$("#income-data thead").html(thead);
				$html_loader_forIncome.loadIncomeTable(incomeDepartmentByCategory);
				});
			}
		},
		loadPatientTable: function(patientData) {
			var tbody="";
			$.each(patientData, function(k,v){
				tbody += "<tr data-id='"+v['id']+"'><td class='patient-name'>"+v['name']+"</td><td style='text-align: center;'>"+v['age']+"</td><td>"+v['gender']+"</td><td>"+v['race']+"</td><td>"+v['cancer']+"</td><td>"+v['stage']+"</td><td style='position:relative; padding-left:10px; text-align:right;' class='digits'>"+parseInt(v['income'])+"</td>></tr>";
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
				tbody += "<tr data-id='"+v['id']+"'><td class='patient-name'>"+v['name']+"</td><td style='text-align: center;'>"+v['age']+"</td><td>"+v['gender']+"</td><td>"+v['race']+"</td><td>"+v['cancer']+"</td><td>"+v['stage']+"</td><td style='position:relative; padding-left:10px; text-align:right;' class='digits'>"+parseInt(v['income'])+"</td>></tr>";
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
			//alert(population_facility+' '+population_cancer)
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
			$.getJSON("patients_sample_income.json", function(data) {
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
					tbody += "<tr data-id='"+v['id']+"'><td class='patient-name'>"+v['name']+"</td><td style='text-align: center;'>"+v['age']+"</td><td>"+v['gender']+"</td><td>"+v['race']+"</td><td>"+v['cancer']+"</td><td>"+v['stage']+"</td><td style='position:relative;padding-left:10px; text-align:right;' class='digits'>"+parseInt(v['income'])+"</td></tr>";
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
			$.getJSON("patients_sample_income.json", function(data) {
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
					tbody += "<tr data-id='"+v['id']+"'><td class='patient-name'>"+v['name']+"</td><td style='text-align: center;'>"+v['age']+"</td><td>"+v['gender']+"</td><td>"+v['race']+"</td><td>"+v['cancer']+"</td><td>"+v['stage']+"</td><td style='position:relative;padding-left:10px; text-align:right;' class='digits'>"+parseInt(v['income'])+"</td></tr>";
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
		loadSubDivisionForPopulation: function() {
			//console.log('load sub division for population');
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
		loadSubDivisionForCohort: function() {
			//console.log('load sub division for cohort');
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
			//console.log('load sub divisions');
			$html_loader_forIncome.loadSubDivisionForPopulation();
			$html_loader_forIncome.loadSubDivisionForCohort();
		},
		loadIncomeCategory: function() {
			$.getJSON("income_breakdown_category.json",function(data){
				var category = data.income_category;
				//alert(incomeDepartmentByCategory);
				var list = "<h6 class='list-heading'>Select a Income Category</h6>";
				$.each(category,function(k,v){
					list +="<li>"+v['name']+"</li>";
					});
				$(".cost_categories ul.sublist").html(list);
			});
		},
		loadIncomeDepartment: function(incomeCategory) {
			var category = incomeCategory;
			if (category!='All Category') {
				$.getJSON('income_breakdown_department.json', function(data) {
						var income_category = data.income_category[category];
						var list = "<h6 class='list-heading'>Select a Income Department</h6>";
						$.each(income_category,function(i,v){
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
			var inlevel = "Income Department";
			$html_loader_forIncome.updateBarChartInfo(title,inlevel,'department');
			$html_loader_forIncome.updatePatientTable();
			$html_loader_forIncome.updateIncomeTable('department');
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
		loadIncomeTable: function(incomeData) {
			var tbody="";
			$.each(incomeData, function(k,v){
				tbody += "<tr><td class='level'>"+v['name']+"</td><td style='position:relative; text-align: right;'><span class='digits'>"+parseInt(v['income'])+"</span></td></tr>";
				});
			//replace the current table body with the new one
			$("#income-data tbody").html(tbody);
			$(".digits").digits();
		},
		getBarChartData: function(incomeDepartmentByCategory) {
				var barChartData = [];
				var departmentCount = 0;
				$.each(incomeDepartmentByCategory, function(k, v) {
					var barChartContent = [];
					barChartContent = [v['name'], parseInt(v['income'])];
					barChartData[departmentCount] = barChartContent;
					
					departmentCount++;
				});
				return barChartData;
	
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
			$html_loader_forIncome.setPopulationName('Individual Patient');
		},
		loadBarChart: function(data, theTitle) {
            $('.barchart').highcharts({
                chart: {
                    type: 'bar'
                },
                title: {
                    text: theTitle
                },
                xAxis: {
                    categories: data['name']
                },
                yAxis: {
                    title: {
                        text: 'Net Income'
                    },
                    labels: {
                        formatter: function() {
                            return '$' + Highcharts.numberFormat(this.value, 0);
                        }
                    }
                },
                tooltip: {
                    formatter: function() {
                        return  this.x + '<br/>' +
                                '<font color="blue">Net Income:</font> <b>$ ' + Highcharts.numberFormat(this.y, 0) + '</b>';
                    }
                },
                colors: [
                    '#41DB04'
                ],
				credits: {
						enabled: false
				},
				exporting: {
						 enabled: false
				},
                series: [{
                        name: 'Net Income',
//                        data: [572, 306, {y: -62, color: 'red'}, {y: -1259, color: 'red'}]
                        data: data['income'],
                        showInLegend: false,
						cursor: 'pointer',
						point:{
								events:{
									click: function (event) {
										var department = $("#departmentName").text();
										var category = $("#categoryName").text();
										var current_selection = this.category;
										//alert('department='+department+' category = '+category+'current selection = '+current_selection);
										if (department == '') {
											$(".overall_cost_wrap").css('float','right');
											//if no department is selected then check for the category
											if (category == '') {
												//if no category is selected
												var title = "in "+current_selection;
												var inlevel = "Income Department";
												$html_loader_forIncome.updateBarChartInfo_fromBar(title,inlevel,'department',current_selection);
												var thead = "<tr><th>Income Department</th><th>Total Income</th</tr>";
												$("#cost-data thead").html(thead);
												$html_loader_forIncome.updateIncomeTable_fromBar('department',current_selection);
											} else {
												//if a category is selected
												var title = "in "+this.category;
												var inlevel = "Income Sub Department";
												$html_loader_forIncome.updateBarChartInfo_fromBar(title,inlevel,'sub_department',current_selection);
												var thead = "<tr><th>Income Sub Department</th><th>Total Cost</th</tr>";
												$("#cost-data thead").html(thead);
												$html_loader_forIncome.updateIncomeTable_fromBar('sub_department',current_selection);
											}
										} else {
											//there is some department selected
											$("#subDepartmentName").html(current_selection);
											$("#chart-cost-data").hide();
											$(".overall_cost_wrap").css('float','left');
										}
									  //$html_loader.updatePieChartInfo(this.name, 'Cost Department');
									}
								}
							}
                    }]
            });
		},
		getBarChartData: function(costDepartmentByCategory) {
            var barChartData = [];
            var barChartDepartment = [];
            var barChartIncome = [];
            var departmentCount = 0;
            $.each(costDepartmentByCategory, function(k, v) {
                barChartDepartment[departmentCount] = v['name'];
                var income = parseInt(v['income']);
                if (income < 0) {
                    barChartIncome[departmentCount] = {y: income, color: 'red'};
                } else {
                    barChartIncome[departmentCount] = income;
                }

                departmentCount++;
            });
            barChartData['name'] = barChartDepartment;
            barChartData['income'] = barChartIncome;

            return barChartData;
        },
		//update bar chart info
		updateBarChartInfo_fromBar: function(title,inlevel,income_level, level_value) {
			$("#cost-in-level").html(title);
			$("#by-level").html(inlevel);
			$("#chart-cost-data").show();
			/*
			alert(cost_level);
			if (cost_level == 'category') {
				$.getJSON("cost_breakdown_category.json",function(data){
					var costDepartmentByCategory = data.cost_category;
					//alert(costDepartmentByCategory);
					var barChartData = $html_loader_forIncome.getBarChartData(costDepartmentByCategory);
					//console.log(barChartData);
					$html_loader_forIncome.loadBarChart(barChartData, 'Income Home','');
					//$html_loader_forIncome.loadIncomeTable(costDepartmentByCategory);
				});
			}*/
			//alert(level_value);
			if (income_level == 'department') {
				var category = level_value;
				$.getJSON("income_breakdown_department.json",function(data){
					var incomeDepartmentByCategory = data.income_category[category];
					//alert(incomeDepartmentByCategory);
					var barChartData = $html_loader_forIncome.getBarChartData(incomeDepartmentByCategory);
					//console.log(barChartData);
					$html_loader_forIncome.loadBarChart(barChartData, 'Income Home');
					//$html_loader_forIncome.loadIncomeTable(incomeDepartmentByCategory);
					
					//load income department
					var list = "<h6 class='list-heading'>Select a Income Department</h6>";
					$.each(incomeDepartmentByCategory,function(i,v){
						var items = v['name'];
						list += "<li>"+items+"</li>";
						});
					$("ul.cost_department_ul").html(list);
					$("#categoryName").html(category);
	 			    $(".cost_department").show();
				});
			}
			if (income_level == 'sub_department') {
				var category = $("#categoryName").text();
				var department = level_value;
				//alert(department);
				$.getJSON("income_breakdown_sub_department.json",function(data){
					var incomeDepartmentByCategory = data.income_structure[category][department];
					//alert(incomeDepartmentByCategory);
					var barChartData = $html_loader_forIncome.getBarChartData(incomeDepartmentByCategory);
					//console.log(barChartData);
					$html_loader_forIncome.loadBarChart(barChartData, 'Income Home');
					//$html_loader_forIncome.loadIncomeTable(costDepartmentByCategory);
					
					//load sub department
					var list = "<h6 class='list-heading'>Select Sub Department</h6>";
					$.each(incomeDepartmentByCategory,function(i,v){
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
			
		},
		updateIncomeTable_fromBar: function(income_level,level_value) {
			/*if (cost_level == 'category') {
				$.getJSON("cost_breakdown_category.json",function(data){
				var costDepartmentByCategory = data.cost_category;
				$html_loader_forIncome.loadIncomeTable(costDepartmentByCategory);
				});
			}*/
			if (income_level == 'department') {
				var category = level_value;
				$.getJSON("income_breakdown_department.json",function(data){
				var incomeDepartmentByCategory = data.income_category[category];
				//alert(incomeDepartmentByCategory);
				$html_loader_forIncome.loadIncomeTable(incomeDepartmentByCategory);
				});
			}
			if (income_level == 'sub_department') {
				var category = $("#categoryName").text();
				var department = level_value;
				$.getJSON("income_breakdown_sub_department.json",function(data){
				var incomeDepartmentByCategory = data.income_structure[category][department];
				//alert(incomeDepartmentByCategory);
				$html_loader_forIncome.loadIncomeTable(incomeDepartmentByCategory);
				});
			}
		}
		

}	



});