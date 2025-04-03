export const loginFormFields = [
  {
    id: "field-1",
    label: "Email",
    type: "text",
    name: "emailForLogin",
    autoComplete: "email",
    param: "email",
  },
  {
    id: "field-2",
    label: "Password",
    type: "password",
    name: "password",
    param: "password",
    autoComplete: "current-password",
  },
];

export const registrationFormFields = [
  {
    id: 1,
    title: "Sign up to your Account",
    description:
      "Please enter your full name and select your role to create your account.",
    fields: [
      {
        id: "field-1",
        label: "Full Name",
        type: "text",
        name: "fullname",
        param: "fullName",
      },
      {
        id: "field-2",
        label: "Role",
        type: "select",
        name: "role",
        options: [
          { value: "user", title: "User", id: "user-option" },
          { value: "consultant", title: "Consultant", id: "consultant-option" },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Sign up to your Account",
    description:
      "Please enter your email and password to create your account and access it securely.",
    fields: [
      {
        id: "field-3",
        label: "Email",
        type: "email",
        name: "emailForRegistration",
        param: "email",
        autoComplete: "email",
      },
      {
        id: "field-4",
        label: "Password",
        type: "password",
        name: "password",
        param: "password",
        autoComplete: "new-password",
      },
    ],
  },
  {
    id: 3,
    title: "License Number Verification",
    description:
      "Enter your license number to confirm your credentials and securely proceed to the next step.",
    fields: [
      {
        id: "field-3",
        label: "Number",
        type: "text",
        name: "license",
        param: "licenseNumber",
      },
    ],
  },
  {
    id: 4,
    title: "Email Verification",
    description:
      "Please enter the 6-digit verification code that was sent to your email. ",
    fields: [
      {
        id: "field-5",
        label: "Code",
        type: "text",
        name: "code",
        maxLength: "6",
      },
    ],
  },
];
