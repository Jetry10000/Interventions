import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailMatcherValidator } from '../shared/longueur-minimum/email-matcher/email-matcher.component';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ITypeProbleme } from './probleme';
import { ProblemeService } from './probleme.service';
import { Router } from '@angular/router';
import { IProbleme } from './problemedata';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  errorMessage: string;
  typesprobleme: ITypeProbleme[];
  probleme: IProbleme;
  
  constructor(private fb: FormBuilder, private typeproblemeService: ProblemeService, private problemeService: ProblemeService, private route : Router) { }

  ngOnInit(): void {
    this.problemeForm = this.fb.group({
      prenom:['', [VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
      nom:['', [Validators.minLength(3), Validators.required]],
      // noTypeProbleme: ['', Validators.required], 
      noTypeProbleme: [''],
      notification: ['pasnotif'], 
      courrielGroup: this.fb.group({
          courriel: [{value: '', disabled: true}],
          courrielConfirmation: [{value: '', disabled: true}],
        }),
      telephone: [{value: '', disabled: true}],
      descriptionProbleme:['',[Validators.required, Validators.minLength(5)]],
      noUnite:'',
      dateProbleme:{value: Date(), disabled:true}
    });
    
    this.typeproblemeService.obtenirTypesProbleme()
        .subscribe(typesProbleme => this.typesprobleme = typesProbleme,
                   error => this.errorMessage = <any>error);   
    this.problemeForm.get('notification').valueChanges
        .subscribe(value => this.setNotification(value));

  }
  save(): void {
    if (this.problemeForm.dirty && this.problemeForm.valid) {
    // Copy the form values over the problem object values
    this.probleme = this.problemeForm.value;
    this.probleme.id = 0;
    this.probleme.courriel = this.problemeForm.get('courrielGroup.courriel').value;
    //this.probleme.dateProbleme = new Date();
    this.problemeService.saveProbleme(this.probleme)
        .subscribe( // on s'abonne car on a un retour du serveur à un moment donné avec la callback fonction
            () => this.onSaveComplete(),  // Fonction callback
            (error: any) => this.errorMessage = <any>error
        );
} else if (!this.problemeForm.dirty) {
    this.onSaveComplete();
}
}
onSaveComplete(): void { 
  // Reset the form to clear the flags
  this.problemeForm.reset();  // Pour remettre Dirty à false.  Autrement le Route Guard va dire que le formulaire n'est pas sauvegardé
  this.route.navigate(['/accueil']);
}
  setNotification(typeNotification: string): void{
    const courriel = this.problemeForm.get('courrielGroup.courriel');
    const confimation = this.problemeForm.get('courrielGroup.courrielConfirmation');
    const telephone = this.problemeForm.get('telephone');
    const courrielGroup = this.problemeForm.get('courrielGroup');
    courriel.clearValidators();
    courriel.reset();
    courriel.disable();
    confimation.clearValidators();
    confimation.reset();
    confimation.disable();
    telephone.clearValidators();
    telephone.reset();
    telephone.disable();
    if(typeNotification === 'courriel'){
      courriel.enable();
      confimation.enable();
      courriel.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')])
      confimation.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')])
      courrielGroup.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])])
    }
    if(typeNotification === 'text'){
      telephone.enable();
      telephone.setValidators([Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(10), Validators.maxLength(10)]);
    }

    courriel.updateValueAndValidity(); 
    confimation.updateValueAndValidity(); 
    telephone.updateValueAndValidity();
  }
}