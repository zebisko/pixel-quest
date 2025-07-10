import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  POSITIONING, 
  Z_INDEX, 
  ANIMATIONS, 
  ARIA_LABELS,
  LAYOUT 
} from '../constants/ui.js';

/**
 * Modal component following Clean Code principles
 * - Single Responsibility: Handles modal rendering and positioning
 * - Dependency Injection: Uses portal for document-level rendering
 * - Clean naming and extracted constants
 */
const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  className = '',
  showCloseButton = true,
  closeOnOverlayClick = true 
}) => {
  // Early return for better readability
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEscapeKey = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  // Attach escape key listener
  React.useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  const modalContent = (
    <div 
      className={cn(
        // Fixed viewport positioning for proper coverage
        POSITIONING.FIXED_VIEWPORT,
        'bg-black/60 backdrop-blur-sm',
        POSITIONING.CENTER_MODAL,
        Z_INDEX.MODAL_OVERLAY,
        'p-4',
        ANIMATIONS.FADE_IN
      )}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className={cn(
          'relative w-full max-w-4xl max-h-[90vh] overflow-y-auto',
          'bg-card border border-border shadow-2xl',
          'rounded-lg',
          Z_INDEX.MODAL_CONTENT,
          ANIMATIONS.SCALE_IN,
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className={`absolute top-2 right-2 ${LAYOUT.MOBILE_HEADER_HEIGHT} w-8`}
            aria-label={ARIA_LABELS.CLOSE_MODAL}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        {children}
      </div>
    </div>
  );

  // Use portal to render at document root level for proper z-index layering
  return createPortal(modalContent, document.body);
};

Modal.displayName = 'Modal';

export default Modal;