import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';
import { ProblemeService } from './probleme.service';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ReactiveFormsModule, HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers:[ProblemeService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it("#1 | Zone PRÉNOM invalide avec 2 caractèress", () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue("a".repeat(2));
    let errors = zone.errors || {};
    expect(errors['nbreCaracteresInsuffisant']).toBeTruthy();
});
it("#2 | Zone PRÉNOM valide avec 3 caractères", () =>{
  let zone = component.problemeForm.controls['prenom'];
  zone.setValue("a".repeat(3));
  let errors = zone.errors || {};
  expect(errors['minLength']).toBeFalsy();
});
it("#3 | Zone PRÉNOM valide avec 200 caractères", () =>{
  let zone = component.problemeForm.controls['prenom'];
  zone.setValue("a".repeat(200));
  let errors = zone.errors || {};
  expect(errors['minLength']).toBeFalsy();
});
it("#4 | Zone PRÉNOM invalide avec aucune valeur", () =>{
  let zone = component.problemeForm.controls['prenom'];
  zone.setValue("");
  let errors = zone.errors || {};
  expect(errors['required']).toBeTruthy();
});
it("#5 | Zone PRÉNOM invalide avec 10 espaces", () =>{
  let zone = component.problemeForm.controls['prenom'];
  zone.setValue("          ");
  let errors = zone.errors || {};
  expect(errors['nbreCaracteresInsuffisant']).toBeTruthy();
});
it("#6 | Zone PRÉNOM invalide avec 2 espaces et 1 caractère", () =>{
  let zone = component.problemeForm.controls['prenom'];
  zone.setValue(" ".repeat(2) +"a".repeat(1));
  let errors = zone.errors || {};
  expect(errors['nbreCaracteresInsuffisant']).toBeTruthy();
});
it('#15 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
  component.setNotification('pasnotification');
  let errors = {};
  let zone = component.problemeForm.get('telephone');
  expect(zone.enabled).toBeFalse(); 
});
it('#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
  component.setNotification('pasnotification');
  let errors = {};
  let zone = component.problemeForm.get('courrielGroup.courriel');
  expect(zone.enabled).toBeFalse(); 
});
it('#16 | Zone TELEPHONE est vide quand ne pas me notifier', () => {
  component.setNotification('pasnotification');
  let zone = component.problemeForm.get('telephone');
  expect(zone.value).toBeNull();
});
it('#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
  component.setNotification('pasnotification');
  let errors = {};
  let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
  expect(zone.enabled).toBeFalse();
});
it('#19 | Zone TELEPHONE est désactivée quand notifier par courriel', () => {
  component.setNotification('courriel');
  let zone = component.problemeForm.get('telephone');
  expect(zone.enabled).toBeFalse(); 
});
it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
  component.setNotification('courriel');
  let zone = component.problemeForm.get('courrielGroup.courriel');
  expect(zone.enabled).toBeTrue(); 
});
it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
  component.setNotification('courriel');
  let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
  expect(zone.enabled).toBeTrue(); 
});
it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
  component.setNotification('courriel');
  let zone = component.problemeForm.get('courrielGroup.courriel');
  let errors = zone.errors || {};
  expect(errors['required']).toBeTruthy();
});
it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
  component.setNotification('courriel');
  let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
  let errors = zone.errors || {};
  expect(errors['required']).toBeTruthy();
});
it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
  component.setNotification('courriel');
  let zone = component.problemeForm.get('courrielGroup.courriel');
  zone.setValue('g');
  let errors = zone.errors || {};
  expect(errors['pattern']).toBeTruthy();
});
it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
  component.setNotification('courriel');
  let zone = component.problemeForm.get('courrielGroup.courriel');
  let zone1 = component.problemeForm.get('courrielGroup.courrielConfirmation');
  let groupe = component.problemeForm.get('courrielGroup');
  let errors = zone.errors || {};
  zone1.setValue('fefef@g.com');
  errors = groupe.errors || {};
  expect(errors['match']).toBeUndefined();
});
it('#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
  component.setNotification('courriel');
  let zone = component.problemeForm.get('courrielGroup.courriel');
  let zone1 = component.problemeForm.get('courrielGroup.courrielConfirmation');
  let groupe = component.problemeForm.get('courrielGroup');
  let errors = zone.errors || {};
  zone.setValue('fefef@g.com');
  errors = groupe.errors || {};
  expect(errors['match']).toBeUndefined();
});
it('#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
  component.setNotification('courriel');
  let zone = component.problemeForm.get('courrielGroup.courriel');
  let zone1 = component.problemeForm.get('courrielGroup.courrielConfirmation');
  let groupe = component.problemeForm.get('courrielGroup');
  let errors = zone.errors || {};
  zone.setValue('fefef@g.com');
  zone1.setValue('fe@g.com');
  errors = groupe.errors || {};
  expect(errors['match']).toBeTrue();
});
it('#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
  component.setNotification('courriel');
  let zone = component.problemeForm.get('courrielGroup.courriel');
  let zone1 = component.problemeForm.get('courrielGroup.courrielConfirmation');
  let groupe = component.problemeForm.get('courrielGroup');
  let errors = zone.errors || {};
  zone.setValue('fefef@g.com');
  zone1.setValue('fefef@g.com');
  errors = groupe.errors || {};
  expect(errors['match']).toBeFalsy();
});
it('#29 | Zone TELEPHONE est activée quand notifier par messagerie texte', () => {
  component.setNotification('text');
  let zone = component.problemeForm.get('telephone');
  expect(zone.enabled).toBeTrue(); 
});
it('#30 | Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte', () => {
  component.setNotification('text');
  let zone = component.problemeForm.get('courrielGroup.courriel');
  expect(zone.enabled).toBeFalse(); 
});
it('#31 | Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte', () => {
  component.setNotification('text');
  let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
  expect(zone.enabled).toBeFalse(); 
});
it('#32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte', () => {
  component.setNotification('text');
  let zone = component.problemeForm.get('telephone');
  let errors = zone.errors || {};
  expect(errors['required']).toBeTruthy();
});
it('#33 | Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte', () => {
  component.setNotification('text');
  let zone = component.problemeForm.get('telephone');
  zone.setValue('a');
  let errors = zone.errors || {};
  expect(errors['pattern']).toBeTruthy();
});
it('#34 | Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte', () => {
  component.setNotification('text');
  let zone = component.problemeForm.get('telephone');
  zone.setValue('123456789');
  let errors = zone.errors || {};
  expect(errors['minlength']).toBeTruthy();
});
it('#35 | Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte', () => {
  component.setNotification('text');
  let zone = component.problemeForm.get('telephone');
  zone.setValue('12345678910');
  let errors = zone.errors || {};
  expect(errors['maxlength']).toBeTruthy();
});
it('#36 | Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte', () => {
  component.setNotification('text');
  let zone = component.problemeForm.get('telephone');
  zone.setValue('1234567891');
  let errors = zone.errors || {};
  expect(errors['minlength']).toBeFalsy();
});
});
