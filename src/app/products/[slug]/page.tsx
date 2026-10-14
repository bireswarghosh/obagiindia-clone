import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import RyanHeader from '@/components/ryan/RyanHeader';
import RyanFooter from '@/components/ryan/RyanFooter';
import { RYAN_PRODUCTS, getProductBySlug } from '@/data/ryan-products';
import { getProductBySlug as getDbProductBySlug } from '@/lib/postgres';
import ProductDetailClient from './ProductDetailClient';

export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return RYAN_PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  let product = null;
  try {
    const dbRow = await getDbProductBySlug(params.slug);
    if (dbRow) {
      product = {
        ...dbRow.data,
        brandName: dbRow.brand_name,
        genericName: dbRow.generic_name,
        tagline: dbRow.tagline || dbRow.data?.tagline || '',
      };
    }
  } catch (e) {}

  if (!product) {
    product = getProductBySlug(params.slug);
  }

  if (!product) {
    return { title: 'Product Not Found | Ryan Dermaceutics' };
  }
  return {
    title: `${product.brandName} Monograph | Ryan Dermaceutics`,
    description: `${product.genericName} - ${product.tagline}. Detailed prescribing and clinical information for healthcare professionals.`,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  let product = null;

  try {
    const dbRow = await getDbProductBySlug(params.slug);
    if (dbRow) {
      product = {
        ...dbRow.data,
        id: dbRow.id,
        slug: dbRow.slug,
        brandName: dbRow.brand_name,
        genericName: dbRow.generic_name,
        strength: dbRow.strength || dbRow.data?.strength || '',
        dosageForm: dbRow.dosage_form || dbRow.data?.dosageForm || 'Cream',
        route: dbRow.route || dbRow.data?.route || 'Topical',
        therapeuticArea: dbRow.therapeutic_area || dbRow.data?.therapeuticArea || 'Acne',
        tagline: dbRow.tagline || dbRow.data?.tagline || '',
        hasFullMonograph: dbRow.has_full_monograph ?? dbRow.data?.hasFullMonograph ?? true,
        isFeatured: dbRow.is_featured ?? dbRow.data?.isFeatured ?? false,
        images: {
          ...(dbRow.data?.images || {}),
          primaryPackshot: dbRow.packshot_image || dbRow.data?.images?.primaryPackshot || '',
        },
        videoUrl: dbRow.product_video_url || '',
      };
    }
  } catch (e) {}

  if (!product) {
    product = getProductBySlug(params.slug);
  }

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
