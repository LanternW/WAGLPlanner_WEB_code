// JavaScript Document

var cpu_oc_maxindex = 0;
var mem_oc_maxindex = 0;

var cpu_oc_pointer = 0; //通过循环指针实现环形队列
var mem_oc_pointer = 0;

var cpu_ocs = Array();
var mem_ocs = Array();

var max_cpu_oc = 0;
var max_mem_oc = 0;


function appendCpuOc(num){
	
	if(cpu_oc_maxindex < 20){
		cpu_ocs[cpu_oc_maxindex] = num;
		cpu_oc_maxindex++;
		cpu_oc_pointer = 0;
	}
	
	else{
		
		cpu_oc_pointer = cpu_oc_pointer % 20;
		cpu_ocs[cpu_oc_pointer] = num;
		cpu_oc_pointer++;
	}
	max_cpu_oc = 0;
	for(var i = 0 ; i < cpu_oc_maxindex ; i++)
	{
		if(cpu_ocs[i] > max_cpu_oc){max_cpu_oc = cpu_ocs[i];}		
	}
	
}

function appendMemOc(num){
	
	if(mem_oc_maxindex < 20){
		mem_ocs[mem_oc_maxindex] = num;
		mem_oc_maxindex++;
		mem_oc_pointer = 0;
	}
	
	else{
		
		mem_oc_pointer = mem_oc_pointer % 20;
		mem_ocs[mem_oc_pointer] = num;
		mem_oc_pointer++;

	}
	max_mem_oc = 0;
	for(var i = 0 ; i < mem_oc_maxindex ; i++)
	{
		if(mem_ocs[i] > max_mem_oc){max_mem_oc = mem_ocs[i];}		
	}
	
}


























































