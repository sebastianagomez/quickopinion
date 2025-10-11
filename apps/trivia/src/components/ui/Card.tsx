import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
  selected?: boolean;
}

export function Card({
  children,
  hover = false,
  selected = false,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl shadow-md p-6',
        'border-2 transition-all duration-200',
        selected
          ? 'border-primary shadow-lg ring-2 ring-primary ring-offset-2'
          : 'border-gray-200',
        hover && 'hover:shadow-lg hover:border-primary-200 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-xl font-bold text-gray-900', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('text-gray-700', className)} {...props}>
      {children}
    </div>
  );
}
