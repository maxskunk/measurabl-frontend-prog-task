import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MsrMockApiService } from './service/msr-mock-api.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,

      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,

        //Angular Material
        FormsModule,
        MatTableModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule
      ],
      providers: [
        MsrMockApiService

      ]
    }).compileComponents();
  });
  it('Service should be created', () => {
    const service: MsrMockApiService = TestBed.inject(MsrMockApiService);
    expect(service).toBeTruthy();
  });
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render search', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.search')).toBeTruthy();
  });

  it('should render table', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('table.mat-table')).toBeTruthy();
  });

  it('Table has 4 cols', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('table.mat-table thead tr')?.children.length).toBe(4);
  });
});
