import React, { type ReactNode, useEffect, createContext, useContext } from 'react';
import { X } from 'lucide-react';

interface DialogContextType {
  onOpenChange: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextType>({
  onOpenChange: () => {},
});

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  return (
    <DialogContext.Provider value={{ onOpenChange }}>
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
        onClick={() => onOpenChange(false)}
      >
        {children}
      </div>
    </DialogContext.Provider>
  );
};

export const DialogContent: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  const { onOpenChange } = useContext(DialogContext);

  return (
    <div
      className={`relative w-full p-6 bg-card border border-border text-foreground rounded-3xl shadow-2xl ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => onOpenChange(false)}
        className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors cursor-pointer"
        aria-label="Close modal"
      >
        <X className="w-4 h-4" />
      </button>
      {children}
    </div>
  );
};

export const DialogHeader: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <div className={`flex flex-col space-y-1.5 ${className}`}>{children}</div>;

export const DialogTitle: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <h2 className={`text-xl font-bold ${className}`}>{children}</h2>;

export const DialogDescription: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>;
