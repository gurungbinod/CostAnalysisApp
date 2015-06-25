
$(document).ready(function(e) {
	
	
	var population = $.cookie('population');	
	if (population != undefined) {
		$html_loader_forIncome.loadDefault_fromCookie();
		
		$html_loader_forIncome.destroy_cookie();
		
	} else {
		$html_loader_forIncome.loadDefault();
	}
	//hide sublist when clicked anywhere on the document.
	$(document).click(function(e) {
        $(".sublist").hide();
    });
	
	//set cookie on totol cost click
	$(document).on('click','#box-total-cost',function(){
		var population = $html_loader_forIncome.getPopulationName();
		$.cookie('population', $("#populationName").text());
		//alert($.cookie('population'));
		if (population == 'Population') {
			$html_loader_forIncome.setCookie_facility();
		} else if (population == 'Patient Cohorts') {
			$html_loader_forIncome.setCookie_cohort();
		} else if (population == 'Individual Patient') {
			$html_loader_forIncome.setCookie_individual();
		} 
		$html_loader_forIncome.setCookie_structure();
		});
	
	$(document).on('click','#btn_update_population', function(){
		var facility = $("#population_facility").val();
		var cancer = $("#population_cancer").val();
		$(".facility_level").text(facility);
		$(".population_cancer_level").text(cancer);
		$html_loader_forIncome.updatePatientTable();
		});
	
	$(document).on('click','#btn_update_cohort', function(){
		var cohort_gender = $("#cohort_gender").val();
		var cohort_race = $("#cohort_race").val();
		var cohort_cancer = $("#cohort_cancer").val();
		var cohort_stage = $("#cohort_stage").val();
		var rangeval = $(".rangeval").html();
		
		$(".cancer_level").text(cohort_cancer);
		$(".gender_level").text(cohort_gender);
		$(".stage_level").text(cohort_stage);
		$(".race_level").text(cohort_race);
		$(".rangeval_level").text(rangeval);
		
		//alert('helo');
		$html_loader_forIncome.updatePatientTable();
		});
	$(document).on('click','#btn_update_individual',function(){
		var name = $("#patient-info-table tbody tr.active td.patient-name").text();
		var id = $(this).children('.patient-id').text();
		$html_loader_forIncome.loadIndividualPatient(id, name);
		});
	$("#populationType").on('click',function(e) {
		$(this).children(".sublist_main").toggle();
		$(".sublist").not($(this).children(".sublist")).hide();
		//alert('hello');
    });
	
	$(document).on('click','.cost_categories',function(){
		$(".sublist").not($(this).children(".sublist")).hide();
		$(this).children(".sublist").toggle();
		e.preventDefault();
		//alert('');
		});
		
	$(document).on('click','.cost_department',function(){
		$(".sublist").not($(this).children(".sublist")).hide();
		$(this).children(".sublist").toggle();
		e.preventDefault();
		});
		
	$(document).on('click','.cost_sub_department',function(){
		$(".sublist").not($(this).children(".sublist")).hide();
		$(this).children(".sublist").toggle();
		e.preventDefault();
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
	
	
	//when clicked on the population type
	$(document).on('click','#populationType li',function(){
		var population = $("#populationName").text();
		//alert(population);
		var selection = $(this).attr('data-link');
		$(".subdivision").hide();
		
		if (selection == 'population_facility_cancer') {
			$("#facility_cancer").show();
			$html_loader_forIncome.setPopulationName('Population');
		} 
		if (selection == 'patient_cohorts') {
			$("#patient_cohorts").show();
			$html_loader_forIncome.setPopulationName('Patient Cohorts');
		}
		if (selection == 'individual_patient') {
			$("#individual_patient").show();
			$html_loader_forIncome.setPopulationName('Individual Patient');
			if (population != $(this).text()) {
				$html_loader_forIncome.setPatientName('');
			}
			//load patient table on 
			$.getJSON("patients_sample_income.json", function(data) {
			var patientsData = data.patients;
			//alert(patientsData);
			//loadPatientTable(patientsData);
			$html_loader_forIncome.loadPatientInfo(patientsData);
			//$html_loader_forIncome.loadPatientInfo(patientsData);
			});
		}
		var title = "of Care";
		var inlevel = "Cost Category";
		if ($("#subDepartmentName").val()!="") {
			//alert('');
			$html_loader_forIncome.updateBarChartInfo(title,inlevel);
		}
		//alert(population + ' '+ $(this).text());
		if (population == $(this).text()) {
			$html_loader_forIncome.updatePatientTable();
			//alert('same population type');
			
		} else {
			//alert('different population');
			$html_loader_forIncome.loadSubDivisions();
			$.getJSON("patients_sample_income.json", function(data) {
				var patientsData = data.patients;
				//alert(patientsData);
				//loadPatientTable(patientsData);
				$html_loader_forIncome.loadPatientTable(patientsData);
			});
		}
	
	});
	
	$(document).on('click','#costHome',function(e){
		var title = "of Care";
		var inlevel = "Income Category";
		$html_loader_forIncome.updateBarChartInfo(title,inlevel,'category');
		$html_loader_forIncome.updateIncomeTable('category');
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
		$html_loader_forIncome.loadIncomeDepartment(category);
		
		$(".overall_cost_wrap").css('float','right');
	});
	
	$(document).on('click','ul.cost_department_ul li',function(){
		var department = $(this).text();
		var cost_category = $("#categoryName").text();
		$("#departmentName").text(department);
		var title = "in "+department+"";
		var inlevel = "Income Sub Department";
		//alert(cost_category+'  '+department);
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
		$html_loader_forIncome.updateBarChartInfo(title,inlevel,'sub_department');
		$html_loader_forIncome.updateIncomeTable('sub_department');
		
		$(".overall_cost_wrap").css('float','right');
	});
	
	$(document).on('click','#income-data tbody tr',function(){
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
					$html_loader_forIncome.updateBarChartInfo_fromBar(title, inlevel, 'department', current_selection);
					
					var thead = "<tr><th>Income Department</th><th>Total Cost</th</tr>";
					$("#income-data thead").html(thead);
					$html_loader_forIncome.updateIncomeTable_fromBar('department', current_selection);
					
				} else {
					//if a category is selected
					var title = "in "+current_selection;
					var inlevel = "Income Sub Department";
					//alert(title);
					$html_loader_forIncome.updateBarChartInfo_fromBar(title, inlevel, 'sub_department', current_selection);
					var thead = "<tr><th>Income Sub Department</th><th>Total Cost</th</tr>";
				$("#income-data thead").html(thead);
					$html_loader_forIncome.updateIncomeTable_fromBar('sub_department', current_selection);
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
			$html_loader_forIncome.loadIndividualPatient(id, name);
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
	$(document).on('click','#patient-info-table tbody tr',function(){
		$(this).siblings('tr').removeClass('active');
		$(this).addClass('active');
		});
});

	