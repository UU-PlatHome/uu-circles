<?php

namespace App\Console\Commands;

use Illuminate\Console\GeneratorCommand as Command;
use Illuminate\Filesystem\Filesystem;

class MakeUsecase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $name = 'make:usecase';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new Usecase class';

    /**
     * The type of class being generated.
     *
     * @var string
     */
    protected $type = 'Usecases';

    /**
     * Create a new command instance.
     *
     * @param Filesystem $files
     */
    public function __construct(Filesystem $files)
    {
        parent::__construct($files);
    }

    /**
     * 生成に使うスタブファイルを取得する.
     *
     * @return string
     */
    protected function getStub()
    {
        return app_path('Console/Commands/stubs/usecase.stub');
    }

    /**
     * クラスのデフォルトの名前空間を取得する.
     *
     * @param string $rootNamespace
     *
     * @return string
     */
    protected function getDefaultNamespace($rootNamespace)
    {
        return $rootNamespace.'\Usecases';
    }
}
