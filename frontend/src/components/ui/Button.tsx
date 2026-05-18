import clsx from "clsx";


// --------------------------------------------------
// TYPES
// --------------------------------------------------

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "form-auth";

type ButtonSize =
  | "sm"
  | "md"
  | "lg";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {

  children: React.ReactNode;

  variant?: ButtonVariant;

  size?: ButtonSize;

  isLoading?: boolean;

  fullWidth?: boolean;
}


// --------------------------------------------------
// STYLES
// --------------------------------------------------

const variantStyles: Record<
  ButtonVariant,
  string
> = {

  primary:
    "bg-primary text-black hover:opacity-90",

  secondary:
    "bg-zinc-800 text-white hover:bg-zinc-700",

  ghost:
    "bg-transparent text-white hover:bg-zinc-800",

  danger:
    "bg-red-500 text-white hover:bg-red-400",

  "form-auth":
    "bg-primary text-black hover:opacity-90",
};

const sizeStyles: Record<
  ButtonSize,
  string
> = {

  sm:
    "px-3 py-2 text-sm",

  md:
    "px-4 py-3 text-base",

  lg:
    "px-5 py-4 text-lg",
};


// --------------------------------------------------
// COMPONENT
// --------------------------------------------------

export default function Button({
  children,

  variant = "primary",

  size = "md",

  isLoading = false,

  fullWidth = false,

  className,

  disabled,

  ...props
}: ButtonProps) {

  return (
    <button
      className={clsx(

        // Base

        "rounded-xl font-semibold transition duration-200",

        "disabled:opacity-50 disabled:cursor-not-allowed",

        "flex items-center justify-center gap-2",

        // Variant

        variantStyles[variant],

        // Size

        sizeStyles[size],

        // Width

        fullWidth && "w-full",

        // External styles

        className
      )}

      disabled={
        disabled || isLoading
      }

      {...props}
    >

      {/* Loading State */}

      {isLoading && (

        <div
          className="
                        h-4 w-4
                        rounded-full
                        border-2
                        border-black/30
                        border-t-black
                        animate-spin
                    "
        />
      )}

      {/* Content */}

      <span>
        {children}
      </span>

    </button>
  );
}