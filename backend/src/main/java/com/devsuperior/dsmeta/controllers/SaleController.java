package com.devsuperior.dsmeta.controllers;
/* O "COMTROLLER" TEM A FUNÇÃO DE IMPLEMENTAR UMA API.
É O CONTROLLER QUE VAI DISPONIBILIZAR
OS ENDPOINTS QUE O FRONTEND VAI PRECISAR PARA ACESSAR O BACKEND */
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.dsmeta.entities.Sale;
import com.devsuperior.dsmeta.services.SaleService;

@RestController
@RequestMapping(value = "sales")
public class SaleController {

/* SALECONTROLLER CHAMA O SALESERVICE */
/*PADRÃO DE 3 CAMADAS(CONTROLLER CHAMA O SERVICE,
SERVICE CHAMA O CONTROLLER */

	@Autowired
	private SaleService service;
	
	@Autowired
	private SmsService smsService;
	
	@GetMapping
	public Page<Sale> findSales(
	@RequestParam(value="minDate", defaultValue = "") String minDate,
	@RequestParam(value="maxDate", defaultValue = "") String maxDate,
	Pageable pageable) {
	return service.findSales(minDate, maxDate, pageable);
	}

	@GetMapping("/{id}/notification")
	public void notifySms(@PathVariable Long id) {
	smsService.sendSms(id);
	}
}
