package com.devsuperior.dsmeta.services;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.devsuperior.dsmeta.entities.Sale;
import com.devsuperior.dsmeta.repositories.SaleRepository;

@Service
public class SaleService {

@Autowired
private SaleRepository repository;
/*QUEM ACESSA O BANCO DE DADOS É O REPOSITÓRIO */
/* SALESERVICE CHAMA TODOS OS DADOS DO REPOSITÓRIO */
public Page<Sale> findSales(String minDate, String maxDate, Pageable pageable){
/*BUSCAR NO BANCO DE DADOS TODAS A MINHAS VENDAS */

LocalDate today = LocalDate.ofInstant(Instant.now(), ZoneId.systemDefault());

/* EXPRESSÃO CONDICIONAL TERNÁRIA QUE SERA TESTADA COM RESULTADO DE VERDADEIRO OU FALSO */
LocalDate min = minDate.equals("") ? today.minusDays(365) : LocalDate.parse(minDate);
LocalDate max = maxDate.equals("") ? today : LocalDate.parse(maxDate);

return repository.findSales(min, max, pageable);

}
}



