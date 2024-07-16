"use client"
import React,{useState} from 'react'
import styled from 'styled-components';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'

const Button = styled.button`
  width: 100px;
  padding: 10px;
  background-color: grey;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
const Problems = () => {
  const questions = [
    {question : 'Check whether number is palindrome or not',completed : 'No'}  ,
    {question : 'odd or even',completed : 'No'}  ,
    {question : 'prime or not',completed : 'No'}  ,
  ]
   const users = [
    { name: 'Sebastian', score: 1124, change: 'up', img: 'https://example.com/image1.jpg' },
    { name: 'Jason', score: 875, change: 'down', img: 'https://example.com/image2.jpg' },
    { name: 'Natalie', score: 774, change: 'up', img: 'https://example.com/image3.jpg' },
    { name: 'Serenity', score: 723, change: 'up', img: 'https://example.com/image4.jpg' },
    { name: 'Hannah', score: 559, change: 'down', img: 'https://example.com/image5.jpg' },
  ];
    const [selectedPerson, setSelectedPerson] = useState(users[0])
  return (
    <div className='flex flex-col items-center p-5 bg-[#151729] min-h-screen'>
      <div className="w-full max-w-2xl mt-10 bg-[#252A40] rounded-lg p-5">
        Problems</div>
        <div id="dropdownUsersButton" data-dropdown-toggle="dropdownUsers" data-dropdown-placement="bottom" class="text-white bg-gray-500 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-800">
                  <Listbox value={selectedPerson} onChange={setSelectedPerson}>
      <ListboxButton>{selectedPerson.name}</ListboxButton>
      <ListboxOptions anchor="bottom">
        {users.map((person) => (
          <ListboxOption key={person.id} value={person} className="data-[focus]:bg-gray-100">
            {person.name}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
    <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
</svg>
    </div>
        {/* <Button className='w-full max-w-2xl mt-10 rounded-lg p-5 hover:bg-green-500'>Completed</Button> */}
    </div>
  )
}

export default Problems