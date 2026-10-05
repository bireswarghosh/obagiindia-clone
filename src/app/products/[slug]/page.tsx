import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import RyanHeader from '@/components/ryan/RyanHeader';
import RyanFooter from '@/components/ryan/RyanFooter';
import { RYAN_PRODUCTS, getProductBySlug } from '@/data/ryan-products';
import ProductDetailClient from './ProductDetailClient';

export function generateStaticParams() {
  return RYAN_PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return { title: 'Product Not Found | Ryan Dermaceutics' };
  }
  return {
    title: `${product.brandName} Monograph | Ryan Dermaceutics`,
    description: `${product.genericName} - ${product.tagline}. Detailed prescribing and clinical information for healthcare professionals.`,
  };
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900">
      <RyanHeader />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200/80 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-slate-500 overflow-x-auto no-scrollbar">
          <Link href="/home" className="hover:text-[#00768a] transition">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#00768a] transition">Products</Link>
          <span>/</span>
          <span className="text-[#00768a] font-semibold truncate">{product.brandName}</span>
        </div>
      </div>

      {/* Main Interactive Product Detail Component */}
      <ProductDetailClient product={product} />

      <RyanFooter />
    </div>
  );
}
