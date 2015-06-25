
$(document).ready(function(e) {
	
	$html_loader.loadDefault();
	
	$(document).on('change','#cohort_cancer', function(){
		$html_loader.updatePatientTable();
		var value = $(this).val();
		$(".cancer_level").text(value);
		});
	$(document).on('change','#cohort_gender', function(){
		$html_loader.updatePatientTable();
		var value = $(this).val();
		$(".gender_level").text(value);
		});
	$(document).on('change','#cohort_stage', function(){
		$html_loader.updatePatientTable();
		var value = $(this).val();
		$(".stage_level").text(value);
		});
	$(document).on('change','#cohort_race', function(){
		$html_loader.updatePatientTable();
		var value = $(this).val();
		$(".race_level").text(value);
		});
	$(document).on('change','#population_facility', function(){
		$html_loader.updatePatientTable();
		var value = $(this).val();
		$(".facility_level").text(value);
		});
	$(document).on('change','#population_cancer', function(){
		$html_loader.updatePatientTable();
		var value = $(this).val();
		$(".population_cancer_level").text(value);
		});
	
	$("#populationType").on('click',function(e) {
		$(this).children(".sublist").toggle();
		$(".sublist").not($(this).children(".sublist")).hide();
		//alert('hello');
    });
	
	$(document).on('click','.cost_categories',function(){
		$(".sublist").not($(this).children(".sublist")).hide();
		$(this).children(".sublist").toggle();
		//alert('');
		});
		
	$(document).on('click','.cost_department',function(){
		$(".sublist").not($(this).children(".sublist")).hide();
		$(this).children(".sublist").toggle();
		});
		
	$(document).on('click','.cost_sub_department',function(){
		$(".sublist").not($(this).children(".sublist")).hide();
		$(this).children(".sublist").toggle();
		});
		
	$('#age_range').slider({
		range: true,
		min: 0,
		max: 116,
		values: [ 0, 116 ],
		slide: function( event, ui ) {
		  $('.rangeval').html(ui.values[0]+" - "+ui.values[1]);
		}
	});
	
	
	$.getJSON("cost_breakdown_category.json",function(data){
		var costDepartmentByCategory = data.cost_category;
		//alert(costDepartmentByCategory);
		var pieChartData = $html_loader.getPieChartData(costDepartmentByCategory);
		//console.log(pieChartData);
		$html_loader.loadPieChart(pieChartData, 'Cost Home','');
		$html_loader.loadCostTable(costDepartmentByCategory);
		});
	
	
	//when clicked on the population type
	$(document).on('click','#populationType li',function(){
		var population = $(this).attr('data-link');
		$(".subdivision").hide();
			
		if (population == 'population_facility_cancer') {
			$("#facility_cancer").show();
			$html_loader.setPopulationName('Population');
		} else if (population = 'patient_cohorts') {
			$("#patient_cohorts").show();
			$html_loader.setPopulationName('Patient Cohorts');
		}
		if ($("#populationName").text() != $(this).text()) {
			//$html_loader.loadSubDivisions();
		}
		var title = "of Care";
		var inlevel = "Cost Category";
		$html_loader.updatePieChartInfo(title,inlevel);
		$html_loader.updatePatientTable();
		
		});
	
	
	
	$(document).on('click','#costHome',function(e){
		var title = "of Care";
		var inlevel = "Cost Category";
		$html_loader.updatePieChartInfo(title,inlevel,'category');
		$html_loader.updateCostTable('category');
		$(".cost_department").hide();
		$(".cost_sub_department").hide();
		$("#categoryName").html('');
		$("#departmentName").html('');
		$("#subDepartmentName").html('');
		e.preventDefault();
		
		$(".overall_cost_wrap").css('float','right');
		
	});
	$(document).on('click','.cost_category li',function(){
		var category = $(this).text();
		$html_loader.loadCostDepartment(category);
		
		$(".overall_cost_wrap").css('float','right');
	});
	
	$(document).on('click','ul.cost_department_ul li',function(){
		var department = $(this).text();
		var cost_category = $("#categoryName").text();
		$("#departmentName").text(department);
		var title = "in "+department+"";
		var inlevel = "Cost Sub Department";
		alert(cost_category+'  '+department);
		if (department!='All Department') {
			$(".cost_sub_department").show();
			//console.log(department);
			$.getJSON('costAnaylsis_metadata.json',{},function(data){
				var cost_department = data.cost_structure[cost_category][department];
					var list = "<h6 class='list-heading'>Select Sub Department</h6>";
					$.each(cost_department,function(i,v){
						var items = v;
						list += "<li>"+v+"</li>";
						//alert(list);
						});
						//alert(list);
					$("ul.cost_sub_department_ul").html(list);
					$("#departmentName").html(department);
			});
		} else {
			$(".cost_sub_department").hide();
			$("#departmentName").html('');
			var title = "in "+cost_category;
			var inlevel = "Cost Department";
		}
		$("#subDepartmentName").html('');

		$html_loader.updatePieChartInfo(title,inlevel,'sub_department');
		$html_loader.updateCostTable('sub_department');
		
		$(".overall_cost_wrap").css('float','right');
	});
	
	$(document).on('click','#cost-data tbody tr',function(){
			//alert('hello');
			var department = $("#departmentName").text();
			var category = $("#categoryName").text();
			var current_selection = $(this).children("td.level").text();
			//alert('department='+department+' category = '+category+'current selection = '+current_selection);
			if (department == '') {
				//if no department is selected then check for the category
				if (category == '') {
					//if no category is selected
					var title = "in "+current_selection;
					var inlevel = "Cost Department";
					//alert(title);
					$html_loader.updatePieChartInfo_fromPie(title, inlevel, 'department', current_selection);
					$html_loader.updateCostTable_fromPie('department', current_selection);
					
				} else {
					//if a category is selected
					var title = "in "+current_selection;
					var inlevel = "Cost Sub Department";
					//alert(title);
					$html_loader.updatePieChartInfo_fromPie(title, inlevel, 'sub_department', current_selection);
					$html_loader.updateCostTable_fromPie('sub_department', current_selection);
				}
			} else {
				//there is some department selected
				$("#subDepartmentName").html(current_selection);
				$("#chart-cost-data").hide();
				$(".overall_cost_wrap").css('float','left');
			}
			
			
		});
	$(document).on('click','#patient-table tbody tr',function(){
			//alert();
			var name = $(this).children('.patient-name').text();
			var id = $(this).children('.patient-id').text();
			$html_loader.loadIndividualPatient(id, name);
		});
	$(document).on('click','ul.cost_sub_department_ul li',function(){
		var sub_department = $(this).text();
		if (sub_department!='All Sub Department') {
					$("#subDepartmentName").html(sub_department);
					$("#chart-cost-data").hide();
		} else {
			$("#subDepartmentName").html('');
			$("#chart-cost-data").show();
		}
		//align the overall cost to left;
		$(".overall_cost_wrap").css('float','left');
	});
});

	