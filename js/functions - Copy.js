
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
			$html_loader.loadCostCategory();
			$html_loader.setOverAllTotalCost();
			$html_loader.setOverAllNetIncome();
			$html_loader.loadSubDivisions();

			$.getJSON("patients_sample.json", function(data) {
			var patientsData = data.patients;
			//alert(patientsData);
			//loadPatientTable(patientsData);
			$html_loader.loadPatientTable(patientsData);
			$(".cost-number").digits();
			});
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
				$html_loader.loadCostTable(costDepartmentByCategory);
				});
			}
			if (cost_level == 'department') {
				var category = $("#categoryName").text();
				$.getJSON("cost_breakdown_department.json",function(data){
				var costDepartmentByCategory = data.cost_category[category];
				//alert(costDepartmentByCategory);
				$html_loader.loadCostTable(costDepartmentByCategory);
				});
			}
			if (cost_level == 'sub_department') {
				var category = $("#categoryName").text();
				var department = $("#departmentName").text();
				$.getJSON("cost_breakdown_sub_department.json",function(data){
				var costDepartmentByCategory = data.cost_structure[category][department];
				//alert(costDepartmentByCategory);
				$html_loader.loadCostTable(costDepartmentByCategory);
				});
			}
		},
		loadPatientTable: function(patientData) {
			var tbody="";
			$.each(patientData, function(k,v){
				tbody += "<tr data-id='"+v['id']+"'><td class='patient-name'>"+v['name']+"</td><td>"+v['age']+"</td><td>"+v['gender']+"</td><td>"+v['race']+"</td><td>"+v['cancer']+"</td><td>"+v['stage']+"</td><td style='position:relative; padding-left:10px; text-align:right;' class='digits'>"+parseInt(v['cost'])+"</td>></tr>";
				});
			//replace the current table body with the new one
			$("#patient-table tbody").html(tbody);
			var patientTable =$('#patient-table').dataTable();
	   
			  // Sort immediately with columns 0 and 1
			  patientTable.fnSort( [ [6,'desc'] ] );
			$(".digits").digits();
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
					tbody += "<tr data-id='"+v['id']+"'><td class='patient-name'>"+v['name']+"</td><td>"+v['age']+"</td><td>"+v['gender']+"</td><td>"+v['race']+"</td><td>"+v['cancer']+"</td><td>"+v['stage']+"</td><td style='position:relative;padding-left:10px; text-align:right;' class='digits'>"+parseInt(v['cost'])+"</td></tr>";
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
			});
			
		},
		loadSubDivisions: function() {
			$.getJSON("costAnaylsis_metadata.json",function(data){
				var choices_facility = data.choices_facility;
				var choices_cancer = data.choices_cancer;
				var choices_gender = data.choices_gender;
				var choices_race = data.choices_race;
				var choices_stage = data.choices_stage;
				var choices_cancer_site = data.choices_cancer_site;
				
				var facilityoption = "",
					canceroption = "",
					genderoption = "",
					raceoption = "",
					stageoption = "",
					ageoption = "<option>Any</option>",
					cancer_siteoption =  "";
				$.each(choices_facility,function(k,v){
					facilityoption +="<option>"+v+"</option>";
					});
				$.each(choices_cancer,function(k,v){
					canceroption +="<option>"+v+"</option>";
					});
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
				$("#population_facility").html(facilityoption);
				$("#population_cancer").html(canceroption);
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
				$(".facility_level").text('All Hospital');
				$(".population_cancer_level").text('All Cancer');
				
			});
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
												$html_loader.updateCostTable_fromPie('department', this.name);
												
											} else {
												//if a category is selected
												var title = "in "+this.name;
												var inlevel = "Cost Sub Department";
												//alert(title);
												$html_loader.updatePieChartInfo_fromPie(title, inlevel, 'sub_department', this.name);
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