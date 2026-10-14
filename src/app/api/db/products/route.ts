import { NextResponse } from 'next/server';
import { getAllProducts, getProductBySlug, upsertProduct, deleteProduct } from '@/lib/postgres';
import { requestHasValidPin } from '@/lib/cms-auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    if (slug) {
      const product = await getProductBySlug(slug);
      if (!product) {
        return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, product });
    }
    const products = await getAllProducts();
    return NextResponse.json({ success: true, count: products.length, products });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!requestHasValidPin(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized PIN' }, { status: 401 });
  }
  try {
    const body = await request.json();
    if (!body.brand_name || !body.generic_name) {
      return NextResponse.json({ success: false, error: 'Brand name and Generic name required' }, { status: 400 });
    }
    const id = body.id || `ryan_${Date.now()}`;
    const slug = body.slug || body.brand_name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const updated = await upsertProduct({
      ...body,
      id,
      slug,
    });
    return NextResponse.json({ success: true, product: updated });
  } catch (error: any) {
    console.error('Error saving product:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!requestHasValidPin(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized PIN' }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Product ID required' }, { status: 400 });
    }
    const ok = await deleteProduct(id);
    return NextResponse.json({ success: ok });
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
