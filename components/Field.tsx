import React from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { FormFieldProps } from '@/types'


const Field = ({control , label , placeholder ,type ,name}:FormFieldProps) => {
  return (
    <FormField
    control={control}
    name={name}
    render={({ field }) => (
        <div className='form-item'>
            <FormLabel className='form-label'>{label}</FormLabel>
            <div className='flex w-full flex-col'>
                <FormControl>
                    <Input placeholder={placeholder} className='input-class'
                    type={type}
                    {...field} />
                </FormControl>
                <FormMessage className="form-message mt-2"/>
            </div>
        </div>
    )}
/>
  )
}

export default Field