<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CityResource\Pages;
use App\Filament\Resources\CityResource\RelationManagers;
use App\Models\City;
use Filament\Forms;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class CityResource extends Resource
{
    protected static ?string $model = City::class;

    protected static ?string $navigationIcon = 'heroicon-o-office-building';

    protected static ?string $navigationGroup = 'GLOBAL';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('title')->required(),
                Forms\Components\TextInput::make('domain')
                    ->label('Subdoamin')
                    ->hint('subdomain.site.com')
                    ->unique(ignoreRecord: true)
                    ->required(),
                Forms\Components\TextInput::make('tax')
                    ->helperText('Please use only dot notation (8.75)')
                    ->numeric()
                    ->postfix('%')
                    ->minValue(0)
                    ->maxValue(99)
                    ->required()
                    ->afterStateHydrated(function (TextInput $component, $state) {
                        $component->state($state * 100);
                    })
                    ->dehydrateStateUsing(fn ($state) => floatval($state) / 100)
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')->searchable(),
                Tables\Columns\TextColumn::make('domain')->label('Subdomain'),
                Tables\Columns\TextColumn::make('tax')
                    ->formatStateUsing(fn (string $state): string => __($state * 100 . "%"))
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageCities::route('/'),
        ];
    }
}
