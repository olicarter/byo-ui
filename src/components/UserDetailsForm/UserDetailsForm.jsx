import React from 'react';

export default function UserDetailsForm() {
  return <div>
      <Styled.Form>
        <Styled.Heading>Personal Datails</Styled.Heading>
        <Styled.FormGroup>
          <Label>Firstname</Label>
          <Styled.TextInput type="text" value={firstName}></Styled.TextInput>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Label>Lastname</Label>
          <Styled.TextInput type="text" value={lastName}></Styled.TextInput>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Label>Email</Label>
          <Styled.TextInput type="text" value={email}></Styled.TextInput>
        </Styled.FormGroup>
      </Styled.Form>
  </div>;
}
