import { Injectable, Inject } from '@angular/core';
import {HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import {select} from '@angular-redux/store';

import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

import { Store } from '@ngrx/store';

import {MyActions} from './my.actions';
import {IMyState} from './my.store';
import { getTotal } from './my.selectors';

interface ApiResponse {
  stringValue: string
}

class MyType {
  typeName: String;
}

@Injectable({
  providedIn: 'root'
})
export class MyapiService {

  @select() readonly searchEnabled$: Observable<boolean>;

  private ngrxTotal$ = this.store.select(getTotal);

  private apiUrl: string;
  searchEnabled: boolean;

  constructor(
    private http: HttpClient,
    private url: string,
    private myType: MyType,
    private store: Store<IMyState>) {
    this.apiUrl = url;
    this.searchEnabledSubscribe();
  }

  getApiResponse(ignoreErrors: boolean = false): Observable<string> {
    const url: string = `${this.apiUrl}`;
    const requestArguments = {
      headers: {},
      withCredentials: true
    };
    if (this.hasSecrets) {
      this.secretMethod(url);
    }
    requestArguments.headers['x-stuff'] = 'api';
    if (this.searchEnabled) {
      requestArguments.headers['x-search'] = 'on';
    }

    return this.http.get<ApiResponse>(url, requestArguments)
      .pipe(
        map(response => {
          return response.stringValue;
        })
      );
  }

  public storeResult(result: string): void {
    const body: string = '{ flag: 1 }';
    this.http.post(this.url, body);
    const someCalc = this.ngrxTotal$ + 10;
  }

  private get hasSecrets(): boolean {
    return true;
  }

  private secretMethod(url: string) {
    // do stuff with secret params
    this.store.dispatch(new MyActions.SetMyFormValue(url))
  }

  private searchEnabledSubscribe(): Observable<boolean> {
    return this.searchEnabled$.first((enabled) => !!enabled).map(() => this.searchEnabled = true);
  }
}

/* showTree:
    SourceFile
        SyntaxList
            ImportDeclaration
                ImportKeyword
                    Text: import
                ImportClause
                    NamedImports
                        FirstPunctuation
                            Text: {
                        SyntaxList
                            ImportSpecifier
                                Identifier
                                    Text: Injectable
                            CommaToken
                                Text: ,
                            ImportSpecifier
                                Identifier
                                    Text: Inject
                        CloseBraceToken
                            Text: }
                FromKeyword
                    Text: from
                StringLiteral
                    Text: '@angular/core'
                SemicolonToken
                    Text: ;
            ImportDeclaration
                ImportKeyword
                    Text: import
                ImportClause
                    NamedImports
                        FirstPunctuation
                            Text: {
                        SyntaxList
                            ImportSpecifier
                                Identifier
                                    Text: HttpClient
                            CommaToken
                                Text: ,
                            ImportSpecifier
                                Identifier
                                    Text: HttpParams
                            CommaToken
                                Text: ,
                            ImportSpecifier
                                Identifier
                                    Text: HttpErrorResponse
                        CloseBraceToken
                            Text: }
                FromKeyword
                    Text: from
                StringLiteral
                    Text: '@angular/common/http'
                SemicolonToken
                    Text: ;
            ImportDeclaration
                ImportKeyword
                    Text: import
                ImportClause
                    NamedImports
                        FirstPunctuation
                            Text: {
                        SyntaxList
                            ImportSpecifier
                                Identifier
                                    Text: Observable
                            CommaToken
                                Text: ,
                            ImportSpecifier
                                Identifier
                                    Text: of
                        CloseBraceToken
                            Text: }
                FromKeyword
                    Text: from
                StringLiteral
                    Text: 'rxjs'
                SemicolonToken
                    Text: ;
            ImportDeclaration
                ImportKeyword
                    Text: import
                ImportClause
                    NamedImports
                        FirstPunctuation
                            Text: {
                        SyntaxList
                            ImportSpecifier
                                Identifier
                                    Text: map
                        CloseBraceToken
                            Text: }
                FromKeyword
                    Text: from
                StringLiteral
                    Text: 'rxjs/operators'
                SemicolonToken
                    Text: ;
            InterfaceDeclaration
                InterfaceKeyword
                    Text: interface
                Identifier
                    Text: ApiResponse
                FirstPunctuation
                    Text: {
                SyntaxList
                    PropertySignature
                        Identifier
                            Text: stringValue
                        ColonToken
                            Text: :
                        StringKeyword
                            Text: string
                CloseBraceToken
                    Text: }
            ClassDeclaration
                SyntaxList
                    Decorator
                        AtToken
                            Text: @
                        CallExpression
                            Identifier
                                Text: Injectable
                            OpenParenToken
                                Text: (
                            SyntaxList
                                ObjectLiteralExpression
                                    FirstPunctuation
                                        Text: {
                                    SyntaxList
                                        PropertyAssignment
                                            Identifier
                                                Text: providedIn
                                            ColonToken
                                                Text: :
                                            StringLiteral
                                                Text: 'root'
                                    CloseBraceToken
                                        Text: }
                            CloseParenToken
                                Text: )
                SyntaxList
                    ExportKeyword
                        Text: export
                ClassKeyword
                    Text: class
                Identifier
                    Text: MyapiService
                FirstPunctuation
                    Text: {
                SyntaxList
                    PropertyDeclaration
                        SyntaxList
                            PrivateKeyword
                                Text: private
                        Identifier
                            Text: apiUrl
                        ColonToken
                            Text: :
                        StringKeyword
                            Text: string
                        SemicolonToken
                            Text: ;
                    Constructor
                        ConstructorKeyword
                            Text: constructor
                        OpenParenToken
                            Text: (
                        SyntaxList
                            Parameter
                                SyntaxList
                                    PrivateKeyword
                                        Text: private
                                Identifier
                                    Text: http
                                ColonToken
                                    Text: :
                                TypeReference
                                    Identifier
                                        Text: HttpClient
                            CommaToken
                                Text: ,
                            Parameter
                                SyntaxList
                                    PrivateKeyword
                                        Text: private
                                Identifier
                                    Text: url
                                ColonToken
                                    Text: :
                                StringKeyword
                                    Text: string
                        CloseParenToken
                            Text: )
                        Block
                            FirstPunctuation
                                Text: {
                            SyntaxList
                                ExpressionStatement
                                    BinaryExpression
                                        PropertyAccessExpression
                                            ThisKeyword
                                                Text: this
                                            DotToken
                                                Text: .
                                            Identifier
                                                Text: apiUrl
                                        FirstAssignment
                                            Text: =
                                        Identifier
                                            Text: url
                                    SemicolonToken
                                        Text: ;
                            CloseBraceToken
                                Text: }
                    MethodDeclaration
                        Identifier
                            Text: getApiResponse
                        OpenParenToken
                            Text: (
                        SyntaxList
                            Parameter
                                Identifier
                                    Text: ignoreErrors
                                ColonToken
                                    Text: :
                                BooleanKeyword
                                    Text: boolean
                                FirstAssignment
                                    Text: =
                                FalseKeyword
                                    Text: false
                        CloseParenToken
                            Text: )
                        ColonToken
                            Text: :
                        TypeReference
                            Identifier
                                Text: Observable
                            FirstBinaryOperator
                                Text: <
                            SyntaxList
                                StringKeyword
                                    Text: string
                            GreaterThanToken
                                Text: >
                        Block
                            FirstPunctuation
                                Text: {
                            SyntaxList
                                VariableStatement
                                    VariableDeclarationList
                                        ConstKeyword
                                            Text: const
                                        SyntaxList
                                            VariableDeclaration
                                                Identifier
                                                    Text: url
                                                ColonToken
                                                    Text: :
                                                StringKeyword
                                                    Text: string
                                                FirstAssignment
                                                    Text: =
                                                TemplateExpression
                                                    TemplateHead
                                                        Text: `${
                                                    SyntaxList
                                                        TemplateSpan
                                                            PropertyAccessExpression
                                                                ThisKeyword
                                                                    Text: this
                                                                DotToken
                                                                    Text: .
                                                                Identifier
                                                                    Text: apiUrl
                                                            LastTemplateToken
                                                                Text: }`
                                    SemicolonToken
                                        Text: ;
                                VariableStatement
                                    VariableDeclarationList
                                        ConstKeyword
                                            Text: const
                                        SyntaxList
                                            VariableDeclaration
                                                Identifier
                                                    Text: requestArguments
                                                FirstAssignment
                                                    Text: =
                                                ObjectLiteralExpression
                                                    FirstPunctuation
                                                        Text: {
                                                    SyntaxList
                                                        PropertyAssignment
                                                            Identifier
                                                                Text: headers
                                                            ColonToken
                                                                Text: :
                                                            ObjectLiteralExpression
                                                                FirstPunctuation
                                                                    Text: {
                                                                SyntaxList
                                                                    Text: 
                                                                CloseBraceToken
                                                                    Text: }
                                                        CommaToken
                                                            Text: ,
                                                        PropertyAssignment
                                                            Identifier
                                                                Text: withCredentials
                                                            ColonToken
                                                                Text: :
                                                            TrueKeyword
                                                                Text: true
                                                    CloseBraceToken
                                                        Text: }
                                    SemicolonToken
                                        Text: ;
                                IfStatement
                                    IfKeyword
                                        Text: if
                                    OpenParenToken
                                        Text: (
                                    PropertyAccessExpression
                                        ThisKeyword
                                            Text: this
                                        DotToken
                                            Text: .
                                        Identifier
                                            Text: hasSecrets
                                    CloseParenToken
                                        Text: )
                                    Block
                                        FirstPunctuation
                                            Text: {
                                        SyntaxList
                                            ExpressionStatement
                                                CallExpression
                                                    PropertyAccessExpression
                                                        ThisKeyword
                                                            Text: this
                                                        DotToken
                                                            Text: .
                                                        Identifier
                                                            Text: secretMethod
                                                    OpenParenToken
                                                        Text: (
                                                    SyntaxList
                                                        Identifier
                                                            Text: url
                                                    CloseParenToken
                                                        Text: )
                                                SemicolonToken
                                                    Text: ;
                                        CloseBraceToken
                                            Text: }
                                ExpressionStatement
                                    BinaryExpression
                                        ElementAccessExpression
                                            PropertyAccessExpression
                                                Identifier
                                                    Text: requestArguments
                                                DotToken
                                                    Text: .
                                                Identifier
                                                    Text: headers
                                            OpenBracketToken
                                                Text: [
                                            StringLiteral
                                                Text: 'x-stuff'
                                            CloseBracketToken
                                                Text: ]
                                        FirstAssignment
                                            Text: =
                                        StringLiteral
                                            Text: 'api'
                                    SemicolonToken
                                        Text: ;
                                ReturnStatement
                                    ReturnKeyword
                                        Text: return
                                    CallExpression
                                        PropertyAccessExpression
                                            CallExpression
                                                PropertyAccessExpression
                                                    PropertyAccessExpression
                                                        ThisKeyword
                                                            Text: this
                                                        DotToken
                                                            Text: .
                                                        Identifier
                                                            Text: http
                                                    DotToken
                                                        Text: .
                                                    Identifier
                                                        Text: get
                                                FirstBinaryOperator
                                                    Text: <
                                                SyntaxList
                                                    TypeReference
                                                        Identifier
                                                            Text: ApiResponse
                                                GreaterThanToken
                                                    Text: >
                                                OpenParenToken
                                                    Text: (
                                                SyntaxList
                                                    Identifier
                                                        Text: url
                                                    CommaToken
                                                        Text: ,
                                                    Identifier
                                                        Text: requestArguments
                                                CloseParenToken
                                                    Text: )
                                            DotToken
                                                Text: .
                                            Identifier
                                                Text: pipe
                                        OpenParenToken
                                            Text: (
                                        SyntaxList
                                            CallExpression
                                                Identifier
                                                    Text: map
                                                OpenParenToken
                                                    Text: (
                                                SyntaxList
                                                    ArrowFunction
                                                        SyntaxList
                                                            Parameter
                                                                Identifier
                                                                    Text: response
                                                        EqualsGreaterThanToken
                                                            Text: =>
                                                        Block
                                                            FirstPunctuation
                                                                Text: {
                                                            SyntaxList
                                                                ReturnStatement
                                                                    ReturnKeyword
                                                                        Text: return
                                                                    PropertyAccessExpression
                                                                        Identifier
                                                                            Text: response
                                                                        DotToken
                                                                            Text: .
                                                                        Identifier
                                                                            Text: stringValue
                                                                    SemicolonToken
                                                                        Text: ;
                                                            CloseBraceToken
                                                                Text: }
                                                CloseParenToken
                                                    Text: )
                                        CloseParenToken
                                            Text: )
                                    SemicolonToken
                                        Text: ;
                            CloseBraceToken
                                Text: }
                    MethodDeclaration
                        SyntaxList
                            PublicKeyword
                                Text: public
                        Identifier
                            Text: storeResult
                        OpenParenToken
                            Text: (
                        SyntaxList
                            Parameter
                                Identifier
                                    Text: result
                                ColonToken
                                    Text: :
                                StringKeyword
                                    Text: string
                        CloseParenToken
                            Text: )
                        ColonToken
                            Text: :
                        VoidKeyword
                            Text: void
                        Block
                            FirstPunctuation
                                Text: {
                            SyntaxList
                                VariableStatement
                                    VariableDeclarationList
                                        ConstKeyword
                                            Text: const
                                        SyntaxList
                                            VariableDeclaration
                                                Identifier
                                                    Text: body
                                                ColonToken
                                                    Text: :
                                                StringKeyword
                                                    Text: string
                                                FirstAssignment
                                                    Text: =
                                                StringLiteral
                                                    Text: '{ flag: 1 }'
                                    SemicolonToken
                                        Text: ;
                                ExpressionStatement
                                    CallExpression
                                        PropertyAccessExpression
                                            PropertyAccessExpression
                                                ThisKeyword
                                                    Text: this
                                                DotToken
                                                    Text: .
                                                Identifier
                                                    Text: http
                                            DotToken
                                                Text: .
                                            Identifier
                                                Text: post
                                        OpenParenToken
                                            Text: (
                                        SyntaxList
                                            Identifier
                                                Text: url
                                            CommaToken
                                                Text: ,
                                            Identifier
                                                Text: body
                                        CloseParenToken
                                            Text: )
                                    SemicolonToken
                                        Text: ;
                            CloseBraceToken
                                Text: }
                    GetAccessor
                        SyntaxList
                            PrivateKeyword
                                Text: private
                        GetKeyword
                            Text: get
                        Identifier
                            Text: hasSecrets
                        OpenParenToken
                            Text: (
                        SyntaxList
                            Text: 
                        CloseParenToken
                            Text: )
                        ColonToken
                            Text: :
                        BooleanKeyword
                            Text: boolean
                        Block
                            FirstPunctuation
                                Text: {
                            SyntaxList
                                ReturnStatement
                                    ReturnKeyword
                                        Text: return
                                    TrueKeyword
                                        Text: true
                                    SemicolonToken
                                        Text: ;
                            CloseBraceToken
                                Text: }
                    MethodDeclaration
                        SyntaxList
                            PrivateKeyword
                                Text: private
                        Identifier
                            Text: secretMethod
                        OpenParenToken
                            Text: (
                        SyntaxList
                            Parameter
                                Identifier
                                    Text: url
                                ColonToken
                                    Text: :
                                StringKeyword
                                    Text: string
                        CloseParenToken
                            Text: )
                        Block
                            FirstPunctuation
                                Text: {
                            SyntaxList
                                Text: 
                            CloseBraceToken
                                Text: }
                CloseBraceToken
                    Text: }
        EndOfFileToken
            Text: 

*/
