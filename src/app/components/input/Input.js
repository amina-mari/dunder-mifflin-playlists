"use client"
import { useState } from 'react'
import styles from './Input.module.scss'

export default function Input({type}) {
    const [value, setValue] = useState("");
    const [isValidInput, setIsValidInput] = useState(true);

    function checkValidity(event, typeInput) {
        if(typeInput === "email") {
            if(event.target.validity.typeMismatch) {
                setIsValidInput(false);
                event.target.setCustomValidity("Opa, acho que o email não está no formato correto!")
            }   

            else if(event.target.validity.valueMissing) {
                setIsValidInput(false);
                event.target.setCustomValidity("Opa, acho que você esqueceu de digitar o email!")
            }   

            else {
                setIsValidInput(true)
                event.target.setCustomValidity("")
            }
        }
        else if(typeInput === "password") {
            if(event.target.validity.valueMissing){
                setIsValidInput(false)
                event.target.setCustomValidity("Opa, acho que você esqueceu de digitar a senha!")
            } else {
                setIsValidInput(true)
                event.target.setCustomValidity("")
            }
        }
    }

    return (
            <input 
                type={type}
                placeholder={type === "email" ? "email" : "senha"}
                required
                data-testid={`input-${type}`}
                className={`${styles["input"]} ${styles[`input-${type}`]} ${isValidInput ? "" : `${styles[`input-${type}_invalid`]}`}`}
                onChange={(e) => {
                    checkValidity(e, type);
                    setValue(e.target.value)
                }}
                value={value}
            />
    )
}