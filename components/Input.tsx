import React from 'react'
import styled from 'styled-components'

interface InputModel {
  label?: string
  type: 'text' | 'password' | 'search' | 'file'
  value: string | number | undefined
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onFocus?: React.FocusEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  disabled?: boolean
  maxLength?: number
  placeholder?: string
  className?: string
  id: string
  name?: string
  margin?: number
  error?: string
  onClickSearch?: () => void
  onEnterSearch?: () => void
  onEnter?: () => void
  onReset?: () => void
  autoComplete?: string
}
const Input = (props: InputModel) => {
  const {
    label,
    type,
    value,
    onChange,
    onFocus,
    onBlur,
    disabled,
    maxLength,
    placeholder,
    className,
    id,
    name,
    margin,
    error,
    onClickSearch,
    onEnterSearch,
    onEnter,
    onReset,
    autoComplete,
  } = props

  const _onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter()
    }
  }
  return (
    <>
      {label ? <LabelStyle>{label}</LabelStyle> : <></>}
      <InputStyle
        type={type}
        id={id}
        className={className}
        name={name}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        onKeyPress={_onEnter}
      ></InputStyle>
      {error && <ErrorLbel className="error-label">{error}</ErrorLbel>}
    </>
  )
}

export default Input

const LabelStyle = styled.p`
  margin-bottom: 8px;
  font-size: 12px;
  color: #666;
`

const InputStyle = styled.input`
  border: 1px solid #e0dfe2;
  border-radius: 4px;
  width: 100%;
  height: 44px;
  min-height: 44px;
  max-height: 44px;
  color: #333;
  transition: 0.21s;
  background-color: #fff;
  padding: 0 14px;
  text-align: left;
  outline: none;
`
const ErrorLbel = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 8px;
`
