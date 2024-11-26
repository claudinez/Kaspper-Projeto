import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaOrcamentoComponent } from './consulta-orcamento.component';

describe('ConsultaOrcamentoComponent', () => {
  let component: ConsultaOrcamentoComponent;
  let fixture: ComponentFixture<ConsultaOrcamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaOrcamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaOrcamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
