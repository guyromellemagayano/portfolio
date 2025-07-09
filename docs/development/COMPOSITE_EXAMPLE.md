# 🏗️ Composite Component Scaffolding Example

## 📖 Overview

This document demonstrates how the future scaffolding system would generate **composite components** - coordinated component systems that work together to create complex UI patterns.

## 🎯 Example: Form System Generation

### Command Usage

```bash
pnpm scaffold --composite Form --includes="Input,Button,Label,Error,Helper" --theme="brand"
```

### Generated File Structure

```text
src/form/
├── index.tsx                    # Main Form component
├── components/
│   ├── FormInput.tsx           # Form-specific input
│   ├── FormButton.tsx          # Form-specific button
│   ├── FormLabel.tsx           # Connected label
│   ├── FormError.tsx           # Error display
│   └── FormHelper.tsx          # Helper text
├── hooks/
│   ├── useFormValidation.ts    # Form validation logic
│   ├── useFormSubmission.ts    # Form submission logic
│   └── useFormState.ts         # Form state management
├── types.ts                    # Shared form types
├── utils.ts                    # Form utilities
├── context.ts                  # Form context provider
├── styles.css                  # Coordinated styles
├── README.md                   # Composite documentation
└── __tests__/
    ├── Form.test.tsx           # Main component tests
    ├── FormInput.test.tsx      # Input component tests
    ├── hooks.test.ts           # Hook tests
    └── integration.test.tsx    # Integration tests
```

## 🔧 Generated Components

### Main Form Component (`index.tsx`)

```typescript
import React, { createContext, useContext, useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';

import { FormInput } from './components/FormInput';
import { FormButton } from './components/FormButton';
import { FormLabel } from './components/FormLabel';
import { FormError } from './components/FormError';
import { FormHelper } from './components/FormHelper';

import { useFormValidation } from './hooks/useFormValidation';
import { useFormSubmission } from './hooks/useFormSubmission';
import { useFormState } from './hooks/useFormState';

import type { FormSystemProps, FormSchema } from './types';
import './styles.css';

export interface FormProps<T extends FormSchema> extends FormSystemProps {
  schema: z.ZodSchema<T>;
  onSubmit: (data: T) => void | Promise<void>;
  defaultValues?: Partial<T>;
  children: React.ReactNode;
}

export const Form = <T extends FormSchema>({
  schema,
  onSubmit,
  defaultValues,
  validation = 'client',
  submission = 'ajax',
  theme = 'default',
  layout = 'vertical',
  children,
  ...props
}: FormProps<T>) => {
  const methods = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: validation === 'client' ? 'onChange' : 'onSubmit',
  });

  const { handleSubmit, formState } = methods;
  const { isSubmitting, errors } = formState;

  const validationHook = useFormValidation(schema, validation);
  const submissionHook = useFormSubmission(onSubmit, submission);
  const stateHook = useFormState(methods);

  const formContextValue = useMemo(() => ({
    theme,
    layout,
    isSubmitting,
    errors,
    ...validationHook,
    ...submissionHook,
    ...stateHook,
  }), [theme, layout, isSubmitting, errors, validationHook, submissionHook, stateHook]);

  return (
    <FormProvider {...methods}>
      <FormContext.Provider value={formContextValue}>
        <form
          onSubmit={handleSubmit(submissionHook.onSubmit)}
          className={`form form--${theme} form--${layout}`}
          {...props}
        >
          {children}
        </form>
      </FormContext.Provider>
    </FormProvider>
  );
};

// Export sub-components for easy access
Form.Input = FormInput;
Form.Button = FormButton;
Form.Label = FormLabel;
Form.Error = FormError;
Form.Helper = FormHelper;

export default Form;
```

### Form Input Component (`components/FormInput.tsx`)

```typescript
import React, { forwardRef } from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { useFormContext as useFormSystemContext } from '../context';
import { Input } from '@guyromellemagayano/components';

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  helper?: string;
  validation?: 'required' | 'email' | 'phone' | 'custom';
  validationRules?: Record<string, unknown>;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ name, label, helper, validation, validationRules, ...props }, ref) => {
    const { control } = useFormContext();
    const { theme, layout, errors } = useFormSystemContext();
    
    const {
      field,
      fieldState: { error, invalid, isTouched, isDirty }
    } = useController({
      name,
      control,
      rules: validationRules,
    });

    const hasError = invalid && isTouched;
    const errorMessage = error?.message;

    return (
      <div className={`form-field form-field--${theme} form-field--${layout}`}>
        {label && (
          <Form.Label htmlFor={name} required={validation === 'required'}>
            {label}
          </Form.Label>
        )}
        
        <Input
          {...field}
          {...props}
          ref={ref}
          id={name}
          error={hasError}
          aria-invalid={hasError}
          aria-describedby={
            [
              helper && `${name}-helper`,
              errorMessage && `${name}-error`,
            ].filter(Boolean).join(' ') || undefined
          }
          className={`form-input ${hasError ? 'form-input--error' : ''}`}
        />
        
        {helper && (
          <Form.Helper id={`${name}-helper`}>
            {helper}
          </Form.Helper>
        )}
        
        {hasError && errorMessage && (
          <Form.Error id={`${name}-error`}>
            {errorMessage}
          </Form.Error>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
```

### Form Validation Hook (`hooks/useFormValidation.ts`)

```typescript
import { useCallback, useMemo } from 'react';
import type { z } from 'zod';
import type { FormSchema, ValidationMode } from '../types';

export const useFormValidation = <T extends FormSchema>(
  schema: z.ZodSchema<T>,
  mode: ValidationMode = 'client'
) => {
  const validateField = useCallback(
    (fieldName: keyof T, value: unknown) => {
      try {
        const fieldSchema = schema.shape[fieldName];
        fieldSchema.parse(value);
        return { isValid: true, error: null };
      } catch (error) {
        if (error instanceof z.ZodError) {
          return {
            isValid: false,
            error: error.errors[0]?.message || 'Validation failed'
          };
        }
        return { isValid: false, error: 'Unknown validation error' };
      }
    },
    [schema]
  );

  const validateForm = useCallback(
    (data: T) => {
      try {
        schema.parse(data);
        return { isValid: true, errors: {} };
      } catch (error) {
        if (error instanceof z.ZodError) {
          const errors: Record<string, string> = {};
          error.errors.forEach((err) => {
            if (err.path[0]) {
              errors[err.path[0] as string] = err.message;
            }
          });
          return { isValid: false, errors };
        }
        return { isValid: false, errors: {} };
      }
    },
    [schema]
  );

  const validationRules = useMemo(() => {
    const rules: Record<string, unknown> = {};
    
    if (mode === 'client') {
      // Generate client-side validation rules from schema
      Object.keys(schema.shape).forEach((key) => {
        const fieldSchema = schema.shape[key];
        rules[key] = {
          required: !fieldSchema.isOptional(),
          validate: (value: unknown) => {
            const result = validateField(key as keyof T, value);
            return result.isValid || result.error;
          }
        };
      });
    }
    
    return rules;
  }, [schema, mode, validateField]);

  return {
    validateField,
    validateForm,
    validationRules,
    mode,
  };
};
```

## 🎨 Generated Styles (`styles.css`)

```css
/* Form System Styles */
.form {
  --form-spacing: 1rem;
  --form-border-radius: 0.5rem;
  --form-transition: all 0.2s ease;
  
  display: flex;
  flex-direction: column;
  gap: var(--form-spacing);
  max-width: 100%;
}

/* Layout Variants */
.form--vertical {
  flex-direction: column;
}

.form--horizontal {
  flex-direction: row;
  flex-wrap: wrap;
}

.form--inline {
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}

/* Theme Variants */
.form--default {
  --form-primary-color: #007acc;
  --form-error-color: #dc3545;
  --form-success-color: #28a745;
}

.form--brand {
  --form-primary-color: var(--brand-primary);
  --form-error-color: var(--brand-error);
  --form-success-color: var(--brand-success);
}

/* Form Field Styles */
.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.form-field--horizontal {
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}

.form-field--inline {
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
}

/* Input Styles */
.form-input {
  transition: var(--form-transition);
  border: 1px solid #d1d5db;
  border-radius: var(--form-border-radius);
  padding: 0.75rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
}

.form-input:focus {
  outline: none;
  border-color: var(--form-primary-color);
  box-shadow: 0 0 0 2px rgba(0, 122, 204, 0.2);
}

.form-input--error {
  border-color: var(--form-error-color);
}

.form-input--error:focus {
  box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.2);
}

/* Responsive Design */
@media (max-width: 768px) {
  .form--horizontal {
    flex-direction: column;
  }
  
  .form-field--horizontal {
    flex-direction: column;
    align-items: flex-start;
  }
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .form-input {
    border-width: 2px;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .form-input {
    transition: none;
  }
}
```

## 📚 Generated Documentation (`README.md`)

```markdown
# Form System Component

A comprehensive form system with coordinated components, validation, and submission handling.

## Features

- **🔧 Coordinated Components**: Input, Button, Label, Error, Helper work together
- **✅ Validation**: Client-side, server-side, or hybrid validation
- **📊 Schema-based**: Zod schema integration for type safety
- **🎨 Theme Support**: Multiple visual themes
- **📱 Responsive**: Mobile-first responsive design
- **♿ Accessible**: WCAG 2.1 AA compliant
- **🔗 Context Integration**: Shared state across all form components

## Quick Start

```typescript
import { Form } from '@guyromellemagayano/components';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

function LoginForm() {
  const handleSubmit = (data: z.infer<typeof schema>) => {
    console.log('Form data:', data);
  };

  return (
    <Form 
      schema={schema} 
      onSubmit={handleSubmit}
      theme="brand"
      layout="vertical"
    >
      <Form.Input 
        name="email" 
        label="Email" 
        type="email" 
        validation="required"
      />
      <Form.Input 
        name="password" 
        label="Password" 
        type="password" 
        validation="required"
      />
      <Form.Button type="submit">
        Sign In
      </Form.Button>
    </Form>
  );
}
```

## Components

### Form (Main Component)

The container component that provides context and handles form submission.

### Form.Input

Form-specific input component with integrated validation and error handling.

### Form.Button

Form-specific button component with loading states and submission handling.

### Form.Label

Connected label component with required field indicators.

### Form.Error

Error display component with consistent styling and accessibility.

### Form.Helper

Helper text component for field descriptions and hints.

## Hooks

### useFormValidation

Custom hook for form validation logic.

### useFormSubmission

Custom hook for form submission handling.

### useFormState

Custom hook for form state management.

## Migration Guide

### From Individual Components

```typescript
// Before: Individual components
import { Input, Button } from '@guyromellemagayano/components';

<form>
  <Input name="email" />
  <Button type="submit">Submit</Button>
</form>

// After: Form system
import { Form } from '@guyromellemagayano/components';

<Form schema={schema} onSubmit={handleSubmit}>
  <Form.Input name="email" />
  <Form.Button type="submit">Submit</Form.Button>
</Form>
```

## Testing

```bash
# Run form system tests
pnpm test src/form/
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🚀 Benefits of Composite Scaffolding

### 1. **Coordinated Architecture**

- Components work together seamlessly
- Shared state management
- Consistent styling and behavior

### 2. **Reduced Development Time**

- Complete system generated at once
- No need to manually coordinate components
- Built-in best practices

### 3. **Type Safety**

- Schema-based validation
- Full TypeScript integration
- Compile-time error checking

### 4. **Comprehensive Testing**

- Integration tests included
- Component interaction testing
- Hook testing patterns

### 5. **Accessibility Built-in**

- ARIA relationships established
- Keyboard navigation handled
- Screen reader optimization

This example demonstrates how **composite scaffolding** transforms the system from generating individual HTML elements to creating complete, coordinated UI systems that solve real-world development challenges.
